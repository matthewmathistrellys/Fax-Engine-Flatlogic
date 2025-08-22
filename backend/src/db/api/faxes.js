
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FaxesDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const faxes = await db.faxes.create(
            {
                id: data.id || undefined,

        sender: data.sender
        ||
        null
            ,

        receiver: data.receiver
        ||
        null
            ,

        summary: data.summary
        ||
        null
            ,

        document_type: data.document_type
        ||
        null
            ,

        urgent: data.urgent
        ||
        false

            ,

        received_at: data.received_at
        ||
        null
            ,

        processed_at: data.processed_at
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return faxes;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const faxesData = data.map((item, index) => ({
                id: item.id || undefined,

                sender: item.sender
            ||
            null
            ,

                receiver: item.receiver
            ||
            null
            ,

                summary: item.summary
            ||
            null
            ,

                document_type: item.document_type
            ||
            null
            ,

                urgent: item.urgent
            ||
            false

            ,

                received_at: item.received_at
            ||
            null
            ,

                processed_at: item.processed_at
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const faxes = await db.faxes.bulkCreate(faxesData, { transaction });

        return faxes;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const faxes = await db.faxes.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.sender !== undefined) updatePayload.sender = data.sender;

        if (data.receiver !== undefined) updatePayload.receiver = data.receiver;

        if (data.summary !== undefined) updatePayload.summary = data.summary;

        if (data.document_type !== undefined) updatePayload.document_type = data.document_type;

        if (data.urgent !== undefined) updatePayload.urgent = data.urgent;

        if (data.received_at !== undefined) updatePayload.received_at = data.received_at;

        if (data.processed_at !== undefined) updatePayload.processed_at = data.processed_at;

        updatePayload.updatedById = currentUser.id;

        await faxes.update(updatePayload, {transaction});

        return faxes;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const faxes = await db.faxes.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of faxes) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of faxes) {
                await record.destroy({transaction});
            }
        });

        return faxes;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const faxes = await db.faxes.findByPk(id, options);

        await faxes.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await faxes.destroy({
            transaction
        });

        return faxes;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const faxes = await db.faxes.findOne(
            { where },
            { transaction },
        );

        if (!faxes) {
            return faxes;
        }

        const output = faxes.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.sender) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'faxes',
                            'sender',
                            filter.sender,
                        ),
                    };
                }

                if (filter.receiver) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'faxes',
                            'receiver',
                            filter.receiver,
                        ),
                    };
                }

                if (filter.summary) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'faxes',
                            'summary',
                            filter.summary,
                        ),
                    };
                }

            if (filter.received_atRange) {
                const [start, end] = filter.received_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    received_at: {
                    ...where.received_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    received_at: {
                    ...where.received_at,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.processed_atRange) {
                const [start, end] = filter.processed_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    processed_at: {
                    ...where.processed_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    processed_at: {
                    ...where.processed_at,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.document_type) {
                where = {
                    ...where,
                document_type: filter.document_type,
            };
            }

            if (filter.urgent) {
                where = {
                    ...where,
                urgent: filter.urgent,
            };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.faxes.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'faxes',
                        'sender',
                        query,
                    ),
                ],
            };
        }

        const records = await db.faxes.findAll({
            attributes: [ 'id', 'sender' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['sender', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.sender,
        }));
    }

};

