const { Room, Bid, Style, BidStyle } = require('../../models')
const { Sequelize } = require('sequelize')
const { and, or, like, not } = Sequelize.Op

exports.selectRoomByBidId = async (bidId) => 
  await Room.findOne({
    raw: true,
    where: {
        bid_id: bidId,
    },
  })
    .then((results) => {
      console.log('Success Selecting Room')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting Room')
      return err
    })

// exports.selectAllRoomByBidId = async (bidId) =>
//   await Room.findAll({
//     where: {
//       bid_id: bidId,
//     },
//     include: [
//       {
//         model: Proposal,
//         required: true,
//       },
//       {
//         model: Style,
//         as: 'bidStyles',
//         through: {
//           model: BidStyle,
//         },
//       },
//     ],
//   })
    // .then((results) => {
    //   console.log('Success Selecting All Room')
    //   return results
    // })
    // .catch((err) => {
    //   console.log('Failed Selecting All Room')
    //   return err
    // })