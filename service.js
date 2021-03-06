'use strict';

const ApiGateway = require('moleculer-web');
const DbMixin = require('./mixins/db.mixin');
const faker = require('faker');

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
  name: 'users',
  version: 1,
  mixins: [ApiGateway, DbMixin('users')],

  /**
   * Settings
   */
  settings: {
    // Exposed port
    port: process.env.PORT || 4000,

    // Exposed IP
    ip: '0.0.0.0',

    fields: ['id', 'name'],

    entityValidator: {
      id: 'string',
      name: 'string|min:3',
    },
  },

  /**
   * Dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {
    /**
     * The "moleculer-db" mixin registers the following actions:
     *  - list
     *  - find
     *  - count
     *  - create
     *  - insert
     *  - update
     *  - remove
     */
  },

  /**
   * Events
   */
  events: {},

  /**
   * Methods
   */
  methods: {
    /**
     * Loading sample data to the collection.
     * It is called in the DB.mixin after the database
     * connection establishing & the collection is empty.
     */
    async seedDB() {
      const mockData = new Array(15).fill({}).map(() => ({ id: faker.random.uuid, name: faker.name.findName() }));

      await this.adapter.insertMany(mockData);
    },
  },

  /**
   * Service created lifecycle event handler
   */
  created() {},

  /**
   * Service started lifecycle event handler
   */
  async started() {},

  /**
   * Service stopped lifecycle event handler
   */
  async stopped() {},
};
