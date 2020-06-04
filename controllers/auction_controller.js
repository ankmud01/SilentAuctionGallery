import { Router } from 'express';

// Import the model (index.js) to use its database functions.
import { all, create, update } from '../models/index';

const router = Router();

// Create all our routes and set up logic within those routes where required.
router.get('/', (_req, res) => {
  all((data) => {
    const hbsObject = {
      "Hello World!"
      //sag: data,
    };
    // console.log("In Get route hbsObject: ",hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/api/users', (req, res) => {
  create([
    'user_name', 'gallery',
  ],
  [req.body.name, req.body.gallery], (result) => {
    // Send back the ID
    res.json({ id: result.insertId });
  });
});

router.put('/api/login/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  console.log('auction_controller.js condition: ', condition);

  update(
    {
      gallery: req.body.gallery,
      // devoured: req.body.gallery
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    },
  );
});

// Export routes for server.js to use.
export default router;
