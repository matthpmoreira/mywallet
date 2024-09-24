import joi from "joi";

export const transactionSchema = joi.object({
    value: joi.number().positive().precision(2).required(),
    description: joi.string().required(),
    type: joi.string().pattern(/^(deposit|withdraw)$/).required(),
    userId: joi.string().optional(),
    _id: joi.string().optional()
});
