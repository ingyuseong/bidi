const roomDB = require('./db/room');
const bidDB = require('./db/bid');
const userDB = require('./db/user');

// exports.getAllRoomByCustomerId = async (userId) => {
//   const bidList = await bidDB.selectAllBidByCustomerId(userId);
//   return await bidList.map(async (bid) => {
//       const {
//         id,
//         customer_id,
//         designer_id,
//         proposal_id,
//       } = bid;

//       const result = await {
//           ...roomDB.selectRoomByBidId(id),
//           customer_id,
//           designer_id,
//           proposal_id,
//       }
//       return result;
//   })
//     .then((results) => {
//         console.log('라라라라라라라라랄라라라라라라라라라랄라랄라라ㅏ라라라라라')
//         console.log(results)
//         return results
//     })
//     .catch((err) => {
//         console.log('Room Service Failed')
//         return err
//     })
// //   return results;
// }
exports.getAllRoomByCustomerId = async (userId) => {
  const bidList = await bidDB.selectAllDMBidByCustomerId(userId);
  return await Promise.all(
      bidList.filter(bid => {
          return bid.status === 'done'
      }).map(async (bid) => {
          const {
            id,
            customer_id,
            designer_id,
            proposal_id,
            user,
          } = bid;
    
          const result = await roomDB.selectRoomByBidId(id);

          return {
            ...result,
            customer_id,
            designer_id,
            proposal_id,
            user,
          }
      })
  )
    .then((results) => {
        console.log('Room Service Successed: getAllRoomByCustomerId')
        return results
    })
    .catch((err) => {
        console.log('Room Service Failed: getAllRoomByCustomerId')
        return err
    })
}

exports.getAllRoomByDesignerId = async (userId) => {
  const bidList = await bidDB.selectAllDMBidByDesignerId(userId);
  return await Promise.all(
      bidList.filter(bid => {
          return bid.status === 'done'
      }).map(async (bid) => {
          const {
            id,
            customer_id,
            designer_id,
            proposal_id,
          } = bid;
          const user = await userDB.selectUser(customer_id);
          const result = await roomDB.selectRoomByBidId(id);

          return {
            ...result,
            customer_id,
            designer_id,
            proposal_id,
            user,
          }
      })
  )
    .then((results) => {
        console.log('Room Service Successed: getAllRoomByDesignerId')
        return results
    })
    .catch((err) => {
        console.log('Room Service Failed: getAllRoomByDesignerId')
        return err
    })
}