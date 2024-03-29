//Perform iterative deepening search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.

/**
 * AUTHORS: John Choi and Austin Schall 
 */

function iterative_deepening_search(initial_state) {
  
  var d = 0;
  while(true){
    let temp = depth_limited_search(initial_state, d);
    if (temp != null){
      return temp;
    }
    ++d;
  }
}
