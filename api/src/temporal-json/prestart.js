const { modelBrands, modelCategories, modelColors, modelGenders, modelOrdens, modelProducts, modelQuestions, modelReviews, modelRoles, modelUsers } = require('../db')

const preBrands = () => {
  const json = require('../temporal-json/brands.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelBrands.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preCategories = async () => {
  const json = require('../temporal-json/categories.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelCategories.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preColors = async () => {
  const json = require('../temporal-json/colors.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelColors.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preGenders = () => {
  const json = require('../temporal-json/genders.json')

  json.forEach(async value => {
    const { name } = value

    try {
      await modelGenders.findOrCreate({
        where: {
          name,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preProducts = async () => {
  const json = require('../temporal-json/api.json')

  json.sneakers.forEach(async value => {
    const {
      name,
      nickname,
      brand_name,
      story_html: description,
      retail_price_cents: price,
      original_picture_url: img,
      color,
      size_range,
      material,
      release_year: released,
      gender,
      designer,
      details,
      shoe_condition,
      category,
    } = value

    const arraySizes = size_range.map(value => {
      return { size: value, stock: 10 }
    })

    try {
      const [product, created] = await modelProducts.findOrCreate({
        where: { name },
        defaults: {
          name,
          nickname: nickname,
          description: description.replace(/<\/?[^>]+(>|$)/g, ''),
          price,
          img,
          stock_total: arraySizes.reduce((a, value) => (a += value.stock), 0),
          size_range: arraySizes,
          material,
          released,
          designer,
          details,
          shoe_condition,
          rating: 0,
        },
      })

      if (!created) return

      const mapCategories = category.map(async value => {
        const responseCategory = await modelCategories.findOne(
          {
            where: {
              name: value,
            },
          },
          { raw: true }
        )

        return responseCategory.id
      })

      const responseBrand = await modelBrands.findOne(
        {
          where: {
            name: brand_name,
          },
        },
        { raw: true }
      )

      const responseColor = await modelColors.findOne(
        {
          where: {
            name: color,
          },
        },
        { raw: true }
      )

      const responseGender = await modelGenders.findOne(
        {
          where: {
            name: gender[0],
          },
        },
        { raw: true }
      )

      const { id: brandID } = responseBrand
      const { id: colorID } = responseColor
      const { id: genderID } = responseGender

      const categories = await Promise.all(mapCategories)
      product.setCategories(categories)

      product.setBrand(brandID)
      product.setColor(colorID)
      product.setGender(genderID)
    } catch (error) {
      console.log(error)
    }
  })
}

const preQuestions = async () => {
  const json = require('../temporal-json/questions.json')

  json.forEach(async value => {
    const { question, answers } = value

    try {
      await modelQuestions.findOrCreate({
        where: {
          question,
          answers,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

const preRoles = () => {
  const json = require('../temporal-json/roles.json')

  json.forEach(async value => {
    const { name } = value

    await modelRoles.findOrCreate({
      where: {
        name,
      },
    })
  })
}

setTimeout(preQuestions, 3000)
setTimeout(preBrands, 3000)
setTimeout(preCategories, 3000)
setTimeout(preColors, 3000)
setTimeout(preGenders, 3000)
setTimeout(preRoles, 3000)
setTimeout(preProducts, 6500)
