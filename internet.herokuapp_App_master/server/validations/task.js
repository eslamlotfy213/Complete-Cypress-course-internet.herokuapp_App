const joi = require('joi');

const TaskSchema = joi.object({
  item: joi.string().min(3).required(),
  isCompleted: joi.boolean().required(),
});

module.exports = { TaskSchema };
