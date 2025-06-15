module.exports = function createPlugin(app) {
  const plugin = {};
  plugin.id = 'signalk-remote-control';
  plugin.name = 'SignalK Engine Remote Control';
  plugin.description = 'SignalK Engine Remote Control';

  let remotes = { paths: [] };
  const setStatus = app.setPluginStatus || app.setProviderStatus;

  plugin.start = function start(options) {
  };

  plugin.registerWithRouter = (router) => {
    router.get('/remotes', (req, res) => {
      res.contentType('application/json');
      res.send(JSON.stringify(remotes));
    });
    router.put('/remotes', (req, res) => {
      const newRemotes = req.body;
      if (newRemotes && newRemotes.paths) {
        remotes = newRemotes;
        console.log('Received remotes:', remotes);
        res.status(200).send("OK");
      } else {
        res.status(400).send("Invalid data structure");
      }
    });
  };

  plugin.stop = function stop() {
  };

  plugin.schema = {
    type: 'object',
    properties: {
    },
  };

  return plugin;
};
