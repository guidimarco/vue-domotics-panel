import { ActionContext } from "vuex";
import { StoreState, ModalStore, ModalData } from "./store.types";

// Mock Data
const EMPTY_MODAL_DATA: ModalData = {
  modalId: null,
  component: null,
  props: {},
};

export default {
  namespaced: true,
  state: () => ({
    showModal: false,
    ...EMPTY_MODAL_DATA,
  }),
  getters: {
    showModal: (state: ModalStore) => state.showModal,
    modalId: (state: ModalStore) => state.modalId,
    modalData: (state: ModalStore) => ({
      modalId: state.modalId,
      component: state.component,
      props: state.props,
    }),
  },
  mutations: {
    SET_MODAL_STATE: (state: ModalStore, payload: Partial<ModalStore>) => {
      Object.assign(state, payload);
    },
  },
  actions: {
    openModal: (
      { commit }: ActionContext<ModalStore, StoreState>,
      payload: ModalData
    ) => {
      commit("SET_MODAL_STATE", {
        showModal: true,
        ...payload,
      });
    },
    closeModal: ({ commit }: ActionContext<ModalStore, StoreState>) => {
      commit("SET_MODAL_STATE", {
        showModal: false,
        ...EMPTY_MODAL_DATA,
      });
    },
    toggleModal: (
      { dispatch, state }: ActionContext<ModalStore, StoreState>,
      payload: ModalData
    ) => {
      if (state.showModal && state.modalId === payload.modalId) {
        // ^ ^ ^ (Stessa) Modale aperta
        return dispatch("closeModal");
      } else {
        // ^ ^ ^ Modale chiusa
        return dispatch("openModal", payload);
      }
    },
  },
};
