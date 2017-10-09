import Jusibe from 'node-jusibe';

/**
 * @description helper function for sending SMS
 * @param {*} phoneNumber
 * @param {*} messagecreator
 * @param {*} priority
 * @param {*} groupname
 * @param {*} request
 * @param {*} response
 * @returns {*} void
 */
export default (phoneNumber, messagecreator,
  priority, groupname, request, response) => {
  const jusibeSDK = new Jusibe(
    process.env.PUBLIC_KEY, process.env.ACCESS_TOKEN
  );
  const params = {
    to: phoneNumber,
    from: 'Post It',
    message: `${messagecreator} just posted a new ${priority} message
     in ${groupname} POSTIT group.`
  };
  jusibeSDK.sendMessage(params)
    .then(() => {
      response.status(200).json({
        confirmation: 'success',
        message: 'Notification Sent!!'
      });
    })
    .catch(() => {
      response.status(400).json({
        confirmation: 'fail',
        message: 'Notification Failed!!'
      });
    });
};
