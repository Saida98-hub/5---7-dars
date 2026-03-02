const { Schema, default: mongoose } = require("mongoose");

const Author = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Muallifning to'liq ismi majburiy"],
      trim: true,
      minlength: [3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxlength: [100, "Ism juda uzun"],
    },

    birthDate: {
      type: Date,
      required: [true, "Tug'ilgan sana majburiy"],
      validate: {
        validator: function (value) {
          return value < new Date();
        },
        message: "Tug'ilgan sana hozirgi vaqtdan oldin bo'lishi kerak",
      },
    },

    deathDate: {
      type: Date,
      required: [true, "Vafot sanasi majburiy"],
      validate: {
        validator: function (value) {
          return value > this.birthDate;
        },
        message: "Vafot sanasi tug'ilgan sanadan keyin bo'lishi kerak",
      },
    },

    bio: {
      type: String,
      required: [true, "Tarjimai hol majburiy"],
      trim: true,
      minlength: [20, "Tarjimai hol kamida 20 ta belgidan iborat bo'lishi kerak"],
      maxlength: [2000, "Tarjimai hol juda uzun"],
    },

    work: {
      type: String,
      required: [true, "Asari majburiy"],
      trim: true,
      minlength: [2, "Asar nomi juda qisqa"],
      maxlength: [200, "Asar nomi juda uzun"],
    },

    period: {
      type: String,
      required: [true, "Davri majburiy"],
      enum: {
        values: [
          "Temuriylar davri",
          "Sovet davri",
          "Jadid davri",
          "Mustaqillik davri"
        ],
        message: "{VALUE} bunday davr qiymati mavjud emas.",
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const AuthorSchema = mongoose.model("author", Author);

module.exports=AuthorSchema