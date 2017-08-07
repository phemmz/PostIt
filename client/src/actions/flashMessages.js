import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';
/**
 * FlashMessages class
 */
// export default class FlashMessages {
//   /**
//    * addFlashMessage is called to add flash messages
//    * @param {object} message
//    * @return {object} type,message
//    */
//   static addFlashMessage(message) {
//     return {
//       type: ADD_FLASH_MESSAGE,
//       message
//     };
//   }
//   /**
//    * @param {integer} id
//    * @return {object} type, id
//    */
//   static deleteFlashMessage(id) {
//     return {
//       type: DELETE_FLASH_MESSAGE,
//       id
//     };
//   }
// }
/**
 * addFlashMessage is called to add flash messages
 * It takes message object (type and text)
 * @param {object} message
 * @return {object} type, message
 */
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
/**
 * @param {integer} id
 * @returns {object} type, id
 */
export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}
