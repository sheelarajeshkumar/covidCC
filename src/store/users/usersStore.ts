import axios from "@/http/http";
import { Module, ActionTree } from "vuex";
import { default as ndjson } from "@/ndjson";

const actions: ActionTree<any, any> = {
  fetchUsers({ commit }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("/v1/api/users");

        commit("setUsers", response.data);

        resolve(response.data);
      } catch (e) {
        try {
          reject(e.response.data.error);
        } catch (e) {
          reject(e.message);
        }
      }
    });
  },
  fetchActivatedUsers({ commit }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get("/v1/api/users?activated=true");

        commit("setActivatedUsers", response.data);

        resolve(response.data);
      } catch (e) {
        try {
          reject(e.response.data.error);
        } catch (e) {
          reject(e.message);
        }
      }
    });
  },
  makeUserVolunteer({ dispatch }, user) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          "/v1/activities/makeUserAsVolunteer/" + user
        );

        dispatch("fetchUsers");
        dispatch("fetchActivatedUsers");

        resolve(response.data);
      } catch (e) {
        try {
          reject(e.response.data.error);
        } catch (e) {
          reject(e.message);
        }
      }
    });
  },
  activateUser({ dispatch }, user) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          "/v1/activities/activate/user/" + user
        );

        dispatch("fetchUsers");
        dispatch("fetchActivatedUsers");

        resolve(response.data);
      } catch (e) {
        try {
          reject(e.response.data.error);
        } catch (e) {
          reject(e.message);
        }
      }
    });
  },
  inActivateUser({ dispatch }, user) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          "/v1/activities/inActivate/user/" + user
        );

        dispatch("fetchUsers");
        dispatch("fetchActivatedUsers");

        resolve(response.data);
      } catch (e) {
        try {
          reject(e.response.data.error);
        } catch (e) {
          reject(e.message);
        }
      }
    });
  },
};
const usersStore: Module<any, any> = {
  state: () => ({
    users: [],
  }),
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },
    setActivatedUsers(state, data) {
      state.activatedUsers = data;
    },
  },
  actions,
  getters: {
    users(state) {
      return state.users;
    },
    activatedUsers(state) {
      return state.activatedUsers;
    },
  },
};

export default usersStore;
