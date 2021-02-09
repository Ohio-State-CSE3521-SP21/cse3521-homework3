//Perform breadth-first search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function breadth_first_search(initial_state) {
  let open = []; //See push()/pop() and unshift()/shift() to operate like stack or queue
                 //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  let closed = new Set(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

  /***Your code for breadth-first search here***/

  var current = {
    parent: null,
    currentState: initial_state,
    successors: find_successors(initial_state) // contains actionID, next state
  }

  while (!is_goal_state(current.current)) {
    var nextState = null
    var i = 0
    for (i = 0; i < current.successors.length; i++) {
      nextState = current.successors[i].resultState
      if (!closed.has(state_to_uniqueid(nextState))) {
        break
      }
    }
    // if nextState == null, no children and not a goal
    if (action == null) {
      // add this node to the closed set and go up
      closed.add(current)
      current = open.pop()
      continue
    }
    // if i == current.successors.length, all children are in closed
    if (i == current.successors.length) {
      // all children are visited so add current node to closed and go up
      closed.add(current)
      current = open.pop()
    } else {
      // we still have some nodes to visit
      // next state to go into
      open.push(current)
      current = {
        parent: current.currentState,
        current: nextState,
        successors: find_successors(nextState)
      }
    }
  }
  // for now, assume goal has been found so add it to open
  open.push(current)
  /*
    Hint: In order to generate the solution path, you will need to augment
      the states to store the predecessor/parent state they were generated from
      and the action that generates the child state from the predecessor state.
      
	  For example, make a wrapper object that stores the state, predecessor and action.
	  Javascript objects are easy to make:
		let object={
			member_name1 : value1,
			member_name2 : value2
		};
      
    Hint: Because of the way Javascript Set objects handle Javascript objects, you
      will need to insert (and check for) a representative value instead of the state
      object itself. The state_to_uniqueid function has been provided to help you with
      this. For example
        let state=...;
        closed.add(state_to_uniqueid(state)); //Add state to closed set
        if(closed.has(state_to_uniqueid(state))) { ... } //Check if state is in closed set
  */
  
  /***Your code to generate solution path here***/
  
  var actionsToGoal = []
  var statesToGoal = []
  for (var i = 0; i < open.length; i++) {
    let node = open[i]
    actionsToGoal.add(node.action)
    statesToGoal.add(node.resultState)
  }
  if (actionsToGoal.length == 0) {
    return null
  }

  return {
    actions : actionsToGoal,
    states : statesToGoal
  }
}
