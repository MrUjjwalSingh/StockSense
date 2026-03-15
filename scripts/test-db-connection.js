const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function maskUri(uri) {
  const atIndex = uri.indexOf("@");
  if (atIndex === -1) return "[uri without credentials]";
  return `***@${uri.slice(atIndex + 1)}`;
}

(async () => {
  try {
    loadDotEnv(path.join(process.cwd(), ".env"));
    loadDotEnv(path.join(process.cwd(), ".env.local"));

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("DB_CONNECTION_FAILED");
      console.error("MONGODB_URI is missing in .env or .env.local");
      process.exit(1);
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });

    const pingResponse = await mongoose.connection.db.admin().command({ ping: 1 });
    const pingOk = pingResponse && (pingResponse.ok === 1 || pingResponse.ping === 1);

    console.log("DB_CONNECTION_OK");
    console.log("PING_OK:", pingOk ? "yes" : "no");
    console.log("DB_NAME:", mongoose.connection.name);
    console.log("HOST:", mongoose.connection.host);
    console.log("URI:", maskUri(uri));
  } catch (error) {
    console.error("DB_CONNECTION_FAILED");
    console.error(error && error.message ? error.message : error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
