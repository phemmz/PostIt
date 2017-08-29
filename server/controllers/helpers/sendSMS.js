import Jusibe from 'node-jusibe';

/**
 * Sends Mail
 * @param {*} phoneNumber
 * @param {*} messagecreator
 * @param {*} priority
 * @param {*} groupname
 * @param {*} req
 * @param {*} res
 * @returns {*} void
 */
export default (phoneNumber, messagecreator, priority, groupname, req, res) => {
  const jusibeSDK = new Jusibe(
    process.env.PUBLIC_KEY, process.env.ACCESS_TOKEN
  );
  const params = {
    to: phoneNumber,
    from: 'Post It',
    message: `${messagecreator} just posted a new ${priority} message in ${groupname} POSTIT group.`
  };
  jusibeSDK.sendMessage(params)
    .then(() => {
      res.status(200).json({
        confirmation: 'success',
        message: 'Notification Sent!!'
      });
    })
    .catch(() => {
      res.status(400).json({
        confirmation: 'fail',
        message: 'Notification Failed!!'
      });
    });
};
