function logAction(action, message) {
    const log = `[${new Date().toISOString()}] ${action}: ${message}`;
    console.log(log);
    // Optionally push to Firebase or download logs
}
