const {
  Matching,
  Bid,
  Proposal,
  BidStyle,
  ScheduleInfo,
  Style,
  User,
} = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

// Create Matching Resource [create]
exports.createMatching = async (attr) => {
  const matching = await Matching.create({
    raw: true,
    ...attr,
    style_id: null,
    review: null,
    star: 0,
    confirm: false,
    done: false,
    canceled: false,
  })
  return matching
}
// Read Matching Resource [findOne, findAll]
exports.findAllMatching = async () => {
  const matchingList = await Matching.findAll({
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Bid,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
            include: [
              {
                model: ScheduleInfo,
                attributes: ['start_time', 'end_time', 'holiday_array'],
              },
            ],
          },
          {
            model: Style,
            as: 'bidStyles',
            through: {
              model: BidStyle,
            },
          },
        ],
      },
      {
        model: Style,
        required: false,
      },
    ],
    order: [['updated_at', 'DESC']],
  })
  return matchingList
}
exports.findOneMatching = async (id) => {
  const matching = await Matching.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Bid,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
            include: [
              {
                model: ScheduleInfo,
                attributes: ['start_time', 'end_time', 'holiday_array'],
              },
            ],
          },
          {
            model: Style,
            as: 'bidStyles',
            through: {
              model: BidStyle,
            },
          },
        ],
      },
      {
        model: Style,
        required: false,
      },
    ],
  })
  return matching
}
exports.findOneMatchingByCustomerId = async (id) => {
  const matching = await Matching.findOne({
    where: {
      customer_id: id,
      done: false,
      canceled: false,
    },
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Bid,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
            include: [
              {
                model: ScheduleInfo,
                attributes: ['start_time', 'end_time', 'holiday_array'],
              },
            ],
          },
          {
            model: Style,
            as: 'bidStyles',
            through: {
              model: BidStyle,
            },
          },
        ],
      },
      {
        model: Style,
        required: false,
      },
    ],
    order: [['updated_at', 'DESC']],
  })
  return matching
}
exports.findAllMatchingByDesignerId = async (id) => {
  const matchingList = await Matching.findAll({
    where: {
      designer_id: id,
      done: false,
      canceled: false,
    },
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Bid,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
            include: [
              {
                model: ScheduleInfo,
                attributes: ['start_time', 'end_time', 'holiday_array'],
              },
            ],
          },
          {
            model: Style,
            as: 'bidStyles',
            through: {
              model: BidStyle,
            },
          },
        ],
      },
      {
        model: Style,
        required: false,
      },
    ],
    order: [['updated_at', 'DESC']],
  })
  return matchingList
}
exports.findAllMatchingHistoryByCustomerId = async (id) => {
  const matchingList = await Matching.findAll({
    where: {
      customer_id: id,
      done: true,
    },
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Bid,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
          {
            model: Style,
            as: 'bidStyles',
            through: {
              model: BidStyle,
            },
          },
        ],
      },
      {
        model: Style,
        required: false,
      },
    ],
    order: [['updated_at', 'DESC']],
  })
  return matchingList
}
exports.findAllMatchingHistoryByDesignerId = async (id) => {
  const matchingList = await Matching.findAll({
    where: {
      designer_id: id,
      done: true,
      canceled: false,
      star: {
        [not]: 0, // Like: star IS NOT NULL
      },
    },
    include: [
      {
        model: Proposal,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
        ],
      },
      {
        model: Bid,
        required: true,
        include: [
          {
            model: User,
            attributes: ['name', 'nick_name', 'gender_type', 'img_src'],
            required: true,
          },
          {
            model: Style,
            as: 'bidStyles',
            through: {
              model: BidStyle,
            },
          },
        ],
      },
      {
        model: Style,
        required: false,
      },
    ],
    order: [['updated_at', 'DESC']],
  })
  return matchingList
}

// Update Proposal Resource [update]
exports.updateMatchingStyle = async (id, style_id) => {
  const matching = await Matching.update(
    {
      raw: true,
      style_id,
    },
    {
      where: {
        id,
      },
    }
  )
  return matching[0]
}
exports.updateMatchingReview = async (id, review) => {
  const matching = await Matching.update(
    {
      raw: true,
      review,
    },
    {
      where: {
        id,
      },
    }
  )
  return matching[0]
}
exports.updateMatchingStar = async (id, star) => {
  const matching = await Matching.update(
    {
      raw: true,
      star,
    },
    {
      where: {
        id,
      },
    }
  )
  return matching[0]
}
exports.updateMatchingReserved = async (id) => {
  const matching = await Matching.update(
    {
      raw: true,
      reserved: true,
    },
    {
      where: {
        id,
      },
    }
  )
  return matching[0]
}
exports.updateMatchingDone = async (id) => {
  const matching = await Matching.update(
    {
      raw: true,
      done: true,
    },
    {
      where: {
        id,
      },
    }
  )
  return matching[0]
}
exports.updateMatchingCanceled = async (id) => {
  const matching = await Matching.update(
    {
      raw: true,
      done: true,
      canceled: true,
    },
    {
      where: {
        id,
      },
    }
  )
  return matching[0]
}

// Delete Matching Resource [destroy]
exports.destroyMatching = async (id) => {
  const matching = await Matching.destroy({
    where: {
      id,
    },
  })
  return matching
}
