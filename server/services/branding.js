const db = require('./db/branding')

// Create Branding Resource [create]
exports.createBranding = async (body) => {
  const attr = {
    userId: body.user_id,
    title: body.title,
    description: body.description,
    keyword_array: body.keyword_array,
    shop_name: body.shop_name,
    position: body.position,
    address: body.address,
    operation_time: body.operation_time,
    break_time: body.break_time,
    shop_number: body.shop_number,
    extra_info: body.extra_info,
  }
  const branding = await db.createBranding(attr)
  if (branding) {
    return branding.dataValues
  } else {
    return null
  }
}
exports.createBrandingStyle = async ({ brandingId, styleIdList }) => {
  if (styleIdList) {
    const brandingStyleList = await Promise.all(
      styleIdList.map((styleId) => {
        const attr = {
          brandingId,
          styleId,
        }
        return db.createBrandingStyle(attr)
      })
    )
    if (brandingStyleList) {
      return brandingStyleList
    } else {
      return null
    }
  } else {
    return null
  }
}

// Read Branding Resource [findOne, findAll]
exports.findAllBranding = async () => {
  let brandingList = await db.findAllBranding()
  if (brandingList && brandingList.length > 0) {
    brandingList = brandingList.map((branding) => {
      let keyword_array = []
      let address = {}
      let extra_info = []
      if (branding.keyword_array) {
        keyword_array = branding.keyword_array.split(',')
      }
      if (branding.extra_info) {
        extra_info = branding.extra_info.split(',')
      }
      if (branding.address) {
        const [zoneCode, streetAddress, detailAddress] =
          branding.address.split(',')
        address = {
          zoneCode,
          address: streetAddress,
          detailAddress,
        }
      }
      return {
        ...branding.dataValues,
        keyword_array,
        address,
        extra_info,
        brandingStyles: branding.brandingStyles.map((style) => {
          let style_keyword_array = []
          if (style.keyword_array) {
            style_keyword_array = style.keyword_array.split(',')
          }
          return {
            ...style.dataValues,
            keyword_array: style_keyword_array,
          }
        }),
      }
    })
    return brandingList
  } else {
    return null
  }
}
exports.findOneBranding = async (id) => {
  let branding = await db.findOneBranding(id)
  if (branding) {
    let keyword_array = []
    let address = {}
    let extra_info = []
    if (branding.keyword_array) {
      keyword_array = branding.keyword_array.split(',')
    }
    if (branding.extra_info) {
      extra_info = branding.extra_info.split(',')
    }
    if (branding.address) {
      const [zoneCode, streetAddress, detailAddress] =
        branding.address.split(',')
      address = {
        zoneCode,
        address: streetAddress,
        detailAddress,
      }
    }
    branding = {
      ...branding.dataValues,
      keyword_array,
      address,
      extra_info,
      brandingStyles: branding.brandingStyles.map((style) => {
        let style_keyword_array = []
        if (style.keyword_array) {
          style_keyword_array = style.keyword_array.split(',')
        }
        return {
          ...style.dataValues,
          keyword_array: style_keyword_array,
        }
      }),
    }
    return branding
  } else {
    return null
  }
}
exports.findAllBrandingByDesignerId = async (id) => {
  let brandingList = await db.findAllBrandingByDesignerId(id)
  if (brandingList && brandingList.length > 0) {
    brandingList = brandingList.map((branding) => {
      let keyword_array = []
      let address = {}
      let extra_info = []
      if (branding.keyword_array) {
        keyword_array = branding.keyword_array.split(',')
      }
      if (branding.extra_info) {
        extra_info = branding.extra_info.split(',')
      }
      if (branding.address) {
        const [zoneCode, streetAddress, detailAddress] =
          branding.address.split(',')
        address = {
          zoneCode,
          address: streetAddress,
          detailAddress,
        }
      }
      return {
        ...branding.dataValues,
        keyword_array,
        address,
        extra_info,
        brandingStyles: branding.brandingStyles.map((style) => {
          let style_keyword_array = []
          if (style.keyword_array) {
            style_keyword_array = style.keyword_array.split(',')
          }
          return {
            ...style.dataValues,
            keyword_array: style_keyword_array,
          }
        }),
      }
    })
    return brandingList
  } else {
    return null
  }
}
exports.findOneBrandingByDesignerId = async (userId) => {
  let branding = await db.findOneBrandingByUserId(userId)
  if (branding) {
    let keyword_array = []
    let address = {}
    let extra_info = []
    if (branding.keyword_array) {
      keyword_array = branding.keyword_array.split(',')
    }
    if (branding.extra_info) {
      extra_info = branding.extra_info.split(',')
    }
    if (branding.address) {
      const [zoneCode, streetAddress, detailAddress] =
        branding.address.split(',')
      address = {
        zoneCode,
        address: streetAddress,
        detailAddress,
      }
    }
    branding = {
      ...branding.dataValues,
      keyword_array,
      address,
      extra_info,
      brandingStyles: branding.brandingStyles.map((style) => {
        let style_keyword_array = []
        if (style.keyword_array) {
          style_keyword_array = style.keyword_array.split(',')
        }
        return {
          ...style.dataValues,
          keyword_array: style_keyword_array,
        }
      }),
    }
    return branding
  } else {
    return null
  }
}

// Update Branding Resource [update]
exports.updateBranding = async (id, body) => {
  const branding = await db.updateBranding(id, body)
  if (branding) {
    return branding
  } else {
    return null
  }
}

exports.updateBrandingStyle = async ({ brandingId, styleIdList }) => {
  if (styleIdList) {
    await db.destroyBrandingStyle(brandingId)
    const brandingStyleList = await Promise.all(
      styleIdList.map((styleId) => {
        const attr = {
          brandingId,
          styleId,
        }
        return db.createBrandingStyle(attr)
      })
    )
    if (brandingStyleList) {
      return brandingStyleList
    } else {
      return null
    }
  } else {
    return null
  }
}

exports.updateMainBranding = async (body) => {
  const { user_id, branding_id } = body
  await db.updateAllOtherBranding(user_id)
  const branding = await db.updateMainBranding(branding_id)
  if (branding) {
    return branding
  } else {
    return null
  }
}

// Delete Branding Resoure [destroy]
exports.destroyBranding = async (id) => {
  const branding = await db.destroyBranding(id)
  if (branding) {
    return branding
  } else {
    return null
  }
}
