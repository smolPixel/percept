

var privates = {

};


/**
 * A module to ease communication with the Percept server through experiment-related methods
 * 
 * @author Daniel Rivas
 */
export class Percept{

  /**
   * 
   * @param {object}    opts      The constructor parameters (encapsulator object)
   * @param {feathers}  opts.app  An instance of feathers-client configured with the appropriate connection 
   */
  constructor(opts){
    this.app = opts.app;
  }

  /**
   * Single method to fetch a timeline, register a participation, and start jsPsych in a single call.
   * 
   * @param {object}  opts
   * @param {string}  opts.label
   * @param {string}  opts.display_element
   * @param {boolean} opts.local
   */
  doExperiment(opts){
    var app = this.app;
    //fancy ES6 way to take care of default values for the opts object
    var defaults = {
      label: '',
      display_element: 'jsPsychTarget',
      local: false
    }
    var opts = Object.assign({}, defaults, opts);

    //if a local run was requested, do not authenticate the request first
    if(!opts.local){
      app.authenticate()
      .catch(err => {
        alert(err);
      })
      .then(resp =>{
        start(app);
      });
    }
    else{
      start(app);
    }

    function start(app){
      app.service('participations').create({experiment: opts.label})
      .catch( err => {
        alert(err); //just echo the error for now
      })
      .then(resp => {

        //ok, a new participation was created, and we got back its _id for storing our data in it later, and the timeline
        //first, remember this _id

        privates.participation = resp._id;

        jsPsych.init({
          timeline : resp.timeline,
          display_element: opts.display_element
        });
      });
    }
  }

}