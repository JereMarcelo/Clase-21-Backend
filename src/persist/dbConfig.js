import mongoose from 'mongoose';

const URI = 'mongodb+srv://JereMarcelo:Jeremias98@cluster0.fbfpvfe.mongodb.net/?retryWrites=true&w=majority';

(async () => {
    try {
        await mongoose.connect(URI);
        console.log('Jeremias you connected to the database.');
    } catch (error) {
        console.log('Database connection error.');
        console.log(error)
    }
})();