import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

(async () => {
	try {
		await connectDB();
		app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
	} catch (err) {
		console.error('Server not started due to DB connection error');
	}
})();
