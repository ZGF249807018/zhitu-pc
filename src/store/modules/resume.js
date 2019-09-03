
const resume = {
  state: {
    current_salary: 0,
    expected_salary: 0
  },

  mutations: {
    CURRENT_SALARY: (state, current_salary) => {
      state.current_salary = current_salary
    },
    EXPECTED_SALARY: (state, expected_salary) => {
      state.expected_salary = expected_salary
    }
  },

  actions: {

  }
}
export default resume
