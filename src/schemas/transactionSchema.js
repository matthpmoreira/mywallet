import joi from "joi";

const transactionSchema = {
    value: joi.number().positive().precision(2).required(),
    description: joi.string().required(),
    type: joi.string().pattern(/^(deposit|withdraw)$/).required()
};

const userIdSchema = {
    userId: joi.string()
}

const idSchema = {
    _id: joi.string().required()
};

export const postTransactionSchema = joi.object(transactionSchema);

export const putTransactionSchema = joi.object({
    ...transactionSchema,
    ...userIdSchema,
    ...idSchema
});

export const deleteTransactionSchema = joi.object(idSchema);
