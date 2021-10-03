const router = require('express').Router();
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');
const {
    userService
} = require('../services');

// GET 
router.get('/find/:id', async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(err);
    }
});

// UPDATE 
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString()
        }

        try {
            const updateUser = await userService.update(req.params.id, {
                $set: req.body
            }, {
                new: true
            });

            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can update only your account!');
    }
});

// DELETE 
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const deleteUser = await userService.delete(req.params.id);

            res.status(200).json('User has been deleted ...');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can update only your account');
    }
});

// GET ALL
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const users = userService.load();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed to see all users!');
    }
});

// GET USER STATS
router.get('/stats', verify, async (req, res) => {
    try {
        const data = await userService.groupByMonth();

        res.status(200).json(data);
    } catch (err) {
        res.status.json(err);
    }
});

module.exports = router;