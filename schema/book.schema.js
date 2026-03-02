const { Schema, default: mongoose } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: [true, "Kitob nomi majburiy"],
      trim: true,
      minlength: [2, "Kitob nomi juda qisqa"],
      maxlength: [200, "Kitob nomi juda uzun"],
    },

    peges: {
      type: Number,
      required: [true, "Sahifalar soni majburiy"],
      min: [1, "Sahifalar soni 1 dan kichik bo'lishi mumkin emas"],
      max: [10000, "Sahifalar soni juda katta"],
      validate: {
        validator: Number.isInteger,
        message: "Sahifalar soni butun son bo'lishi kerak",
      },
    },

    publishedYear: {
      type: Number,
      required: [true, "Nashr yili majburiy"],
      min: [1000, "Nashr yili noto'g'ri"],
      max: [new Date().getFullYear(), "Nashr yili kelajakda bo'lishi mumkin emas"],
    },

    publishedHome: {
      type: String,
      required: [true, "Nashriyot nomi majburiy"],
      trim: true,
      minlength: [2, "Nashriyot nomi juda qisqa"],
      maxlength: [200, "Nashriyot nomi juda uzun"],
    },

    description: {
      type: String,
      required: [true, "Tavsif majburiy"],
      trim: true,
      minlength: [20, "Tavsif kamida 20 ta belgidan iborat bo'lishi kerak"],
      maxlength: [5000, "Tavsif juda uzun"],
    },

    genre: {
      type: String,
      required: [true, "Janr majburiy"],
      enum: {
        values: [
          "Romance",
          "Comedy",
          "Thriller",
          "Horror",
          "Action",
          "Documantary",
          "Science fiction",
          "Fantasy",
          "History"
        ],
        message: "{VALUE} bunday janr qiymati qabul qilinmaydi",
      },
    },

    imageURL: {
      type: String,
      required: [true, "Rasm manzili majburiy"],
      trim: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        "Rasm havolasi noto'g'ri formatda",
      ],
    },
    authorInfo: {
      type: Schema.Types.ObjectId,
      ref: "author",
      required: true
    }
  },
  { 
    versionKey: false,
    timestamps: true,
  }
);

const BookSchema = mongoose.model("book", Book);

module.exports=BookSchema