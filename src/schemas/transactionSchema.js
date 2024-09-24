import joi from "joi";

export const newTransactionSchema = joi.object({
    value: joi.number().positive().precision(2).required(),
    description: joi.string().required(),
    type: joi.string().pattern(/^(deposit|withdraw)$/).required()
});

export const transactionIdSchema = joi.object({
    id: joi.string().required()
})
