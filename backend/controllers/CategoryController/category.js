// controllers/CategoryController/category.js
const Category = require("../../models/models").Category;

exports.importCategoriesFromDict = async (req, res) => {
  try {
    const cate = {
      'Men': ['Topwear', 'Innerwear', 'Shoes', 'Bottomwear', 'Sandal', 'Dress', 'Socks'],
      'Women': ['Topwear', 'Innerwear', 'Shoes', 'Bottomwear', 'Sandal', 'Dress', 'Socks'],
      'Girls': ['Topwear', 'Innerwear', 'Shoes', 'Bottomwear', 'Sandal', 'Dress', 'Socks'],
      'Boys': ['Topwear', 'Innerwear', 'Shoes', 'Bottomwear', 'Sandal', 'Dress', 'Socks'],
      'Unisex': ['Topwear', 'Innerwear', 'Shoes', 'Bottomwear', 'Sandal', 'Dress', 'Socks']
    };
    // Duyệt qua các đối tượng trong cate
    for (const target in cate) {
      if (cate.hasOwnProperty(target)) {
        // Duyệt qua các category tương ứng với từng target
        for (const category of cate[target]) {
          // Kiểm tra xem category đã tồn tại trong database chưa
          const existingCategory = await Category.findOne({ category, target });

          if (!existingCategory) {
            // Tạo mới đối tượng category nếu chưa có trong database
            const newCategory = new Category({
              category,
              target
            });

            // Lưu category vào MongoDB
            await newCategory.save();
            console.log(`Added category: ${category} with target: ${target}`);
          }
        }
      }
    }

    res.status(201).send({
      message: "Categories imported and saved successfully from the dictionary"
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while importing categories."
    });
  }
};