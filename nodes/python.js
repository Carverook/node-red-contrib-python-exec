module.exports = function(RED) {
    function PythonNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.code = config.pythonCode;
        node.modules = config.pipModules;

        // Установка модулей pip при старте
        if (node.modules) {
            const modules = node.modules.split(',').map(m => m.trim()).filter(m => m);
            if (modules.length) {
                node.status({fill:"blue",shape:"dot",text:"installing modules"});
                const install = require('child_process').spawn('python3', ['-m','pip','install', ...modules]);
                install.stdout.on('data', data => node.log(`pip: ${data}`));
                install.stderr.on('data', data => node.error(`pip error: ${data}`));
                install.on('close', code => {
                    if (code === 0) {
                        node.status({});
                    } else {
                        node.status({fill:"red",shape:"ring",text:"pip install failed"});
                    }
                });
            }
        }

        node.on('input', function(msg, send, done) {
            const { spawn } = require('child_process');
            const py = spawn('python3', ['-u']);
            let output = '';
            let error = '';

            py.stdin.write(node.code || msg.payload || '');
            py.stdin.end();

            py.stdout.on('data', data => { output += data.toString(); });
            py.stderr.on('data', data => { error += data.toString(); });
            py.on('close', (code) => {
                if (error) {
                    node.error(error, msg);
                }
                msg.payload = output;
                send(msg);
                if (done) done();
            });
        });
    }
    RED.nodes.registerType("python", PythonNode);
};
