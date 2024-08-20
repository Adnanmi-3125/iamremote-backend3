// @ts-nocheck
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::job.job', ({ strapi }) => ({
  async apply(ctx) {
    const { id } = ctx.params;

    if (!id) {
      return ctx.badRequest('Missing job ID');
    }

    const job = await strapi.entityService.findOne('api::job.job', id);

    if (!job) {
      return ctx.notFound('Job not found');
    }

    const updatedJob = await strapi.entityService.update('api::job.job', id, {
      data: {
        applyCount: (job.applyCount || 0) + 1
      }
    });

    ctx.send({ applyCount: updatedJob.applyCount });
  }
}));