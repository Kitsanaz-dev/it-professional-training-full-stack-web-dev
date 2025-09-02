const getHello = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Hello from Node.js API!',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing hello request',
            error: error.message
        });
    }
};

const getGoodbye = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Goodbye from Node.js API!',
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing goodbye request',
            error: error.message
        });
    }
}

const getHelloWorld = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Hello World!',
            data: {
                greeting: 'Welcome to our API',
                version: '1.0.0',
                environment: process.env.NODE_ENV || 'development'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing hello world request',
            error: error.message
        });
    }
};

const postHello = (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required in request body'
            });
        }

        res.status(200).json({
            success: true,
            message: `Hello ${name}! Nice to meet you.`,
            data: {
                receivedName: name,
                greeting: 'Welcome to our API'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing hello request',
            error: error.message
        });
    }
};

const getHelloUser = (req, res) => {
    try {
        const { name } = req.params;

        res.status(200).json({
            success: true,
            message: `Hello ${name}!`,
            data: {
                user: name,
                greeting: 'Welcome!',
                route: 'URL parameter route'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing user hello request',
            error: error.message
        });
    }
};

module.exports = {
    getHello,
    getGoodbye,
    getHelloWorld,
    postHello,
    getHelloUser
};