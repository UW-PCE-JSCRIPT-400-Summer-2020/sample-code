const { Router } = require("express");
const router = Router();

const WidgetDAO = require('../daos/widgets');

// Create
router.post("/", async (req, res, next) => {
  const widget = req.body;
  if (!widget || JSON.stringify(widget) === '{}' ) {
    res.status(400).send('widget is required');
  } else {
    const savedWidget = await WidgetDAO.create(widget);
    res.json(savedWidget); 
  }
});

// Read - single widget
router.get("/:id", async (req, res, next) => {
  const widgetId = req.params.id;
  const widget = await WidgetDAO.getById(req.params.id);
  if (widget) {
    res.json(widget);
  } else {
    res.sendStatus(404);
  }
});

// Update
router.put("/:id", async (req, res, next) => {
  const widgetId = req.params.id;
  const widget = req.body;
  if (!widget || JSON.stringify(widget) === '{}' ) {
    res.status(400).send('widget is required"');
  } else {
    //update widget here
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const widgetId = req.params.id;
  // delete widget here
});

module.exports = router;
