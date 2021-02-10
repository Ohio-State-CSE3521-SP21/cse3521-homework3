//Perform depth-limited search from initial state, using defined "is_goal_state"
//and "find_successors" functions
//Will not examine paths longer than "depth_limit" (i.e. paths that have "depth_limit" states in them, or "depth_limit-1" actions in them)
//Returns: null if no goal state found
//Returns: object with two members, "actions" and "states", where:
//  actions: Sequence(Array) of action ids required to reach the goal state from the initial state
//  states: Sequence(Array) of states that are moved through, ending with the reached goal state (and EXCLUDING the initial state)
//  The actions and states arrays should both have the same length.
function depth_limited_search(initial_state,depth_limit) {

  /***Your code for depth-limited search here!***/

  /***DO NOT do repeated state or loop checking!***/
  
  /**
   * NOTES FOR AUSTIN:
   * 
   * 1) Push root node to stack
   * 2) Mark root node as visited
   * 3) Print root node (?)
   * 4) if is goalstate(current state) then go to 12)
   * 5) LOOP: Check top_stack
   * 6) if stack == empty then return
   * 7) if depth_limit != exhausted & if adjacent != visited
   *      - Push node to stack
   *      - mark node as visited
   *      - print node (?)
   * 8) if is_goal_state(current_state) then go to 12)
   * 9) if adjacent = visited
   *      - pop/pull top_stack
   * 10) if depth_limit = exhausted
   *      - go to 12)
   * 11) Go to 5)
   * 12) Exit
   */

  let open = [];

  let closed = new Set();

  let openStates = []
  let closedStates = new Set()
  let actionHistory = []
  var current = {
    parent: null,
    currentState: initial_state,
    successors: find_successors(initial_state), // contains actionID, next state
    depth: depth_limit
  }

  var successor = null
  var nextState = null
  while (!is_goal_state(current.currentState)) {
    console.log(open.toString)
    successor = null
    nextState = null
    var i = 0
    for (i = 0; i < current.successors.length; i++) {
      successor = current.successors[i]
      nextState = successor.resultState
      if (!closed.has(state_to_uniqueid(nextState)) && !open.includes(state_to_uniqueid(nextState))) {
        break
      }
    }
    // if successor == null, no children and not a goal
    if (successor == null) {
      // add this node to the closed set and go up
      closed.add(state_to_uniqueid(current.currentState))
      closedStates.add(current)
      current = openStates.pop()
      actionHistory.pop()
      continue
    }
    // if i == current.successors.length, all children are in closed
    if (i == current.successors.length) {
      // all children are visited so add current node to closed and go up
      closed.add(state_to_uniqueid(current.currentState))
      closedStates.add(current)
      current = openStates.pop()
      actionHistory.pop()
    } else {
      // we still have some nodes to visit
      // next state to go into
      open.push(state_to_uniqueid(current.currentState))
      openStates.push(current)
      actionHistory.push(successor.actionID)
      current = {
        parent: current.currentState,
        currentState: nextState,
        successors: find_successors(nextState)
      }
    }
  }
  // for now, assume goal has been found so add it to open
  open.push(state_to_uniqueid(current.currentState))
  openStates.push(current)
  actionHistory.push(successor.actionID)
  
  
  /***Your code to generate solution path here***/
  var actionsToGoal = []
  var statesToGoal = []
  for (var i = 0; i < actionHistory.length; i++) {
    actionsToGoal.push(actionHistory[i])
  }
  for (var i = 0; i < openStates.length; i++) {
    let node = openStates[i]
    statesToGoal.push(node.currentState)
  }
  if (actionsToGoal.length != statesToGoal.length) {
    console.log("Actions To Goal: " + actionsToGoal.length)
    console.log("States To Goal: " + statesToGoal.length)
  }
  console.log("Returning")
  console.error("Returning")
  if (actionsToGoal.length == 0) {
    return null
  }

  return {
    actions : actionsToGoal,
    states : statesToGoal
  }
  
  /*
    Hint: You may implement DLS either iteratively (with open set) or recursively.
    
    In the iterative case, you will need to do similar to breadth-first search and augment
    the state. In addition to predecessor and action, you will also need to store depth.
    (You should be able to re-use your BFS code and only make a small amount of changes to
     accomplish this. Be sure to remove repeat checking!)

    In the recursive case, you don't need the above. Building the solution path is a little
    trickier, but I suggest you look into the Array.unshift() function.
  */
}
