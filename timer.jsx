class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wage:0, 
      calcWage:0, 
      start:new Date(), //time when start button is pressed
      date: new Date() //updated time with each run of tick
    };
  }
 
  //updates time 
  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  //starts clock
  start() {
    if(this.timerID) //if timer is already running. Clear interval.
      clearInterval(this.timerID); 
    
    this.setState({
      start:new Date(), //sets start time to now. 
      isRunning: true //identifies timer as running
    })
    
    //run tick every 10 milliseconds, until stop
    this.timerID = setInterval(
      () => this.tick(),
      10
    ); 
  }
  
  stop() {
    clearInterval(this.timerID); //stops running of tick
    this.setState({
      isRunning: false //identifies timer as stopped
    })
    this.wage(); //calculates money
  }
  
  //update wage on every user input
  handleChange(e){
    this.setState({wage:parseInt(e.currentTarget.value)}); 
  }
  
  //calculates money earned between start and end of timer
  wage(){
    const {wage,start,date} = this.state
    if(!wage) 
      this.setState({calcWage:0}) //if no user input default wage to $0
    else {
      let wageMil = wage/60/60/1000; //calculates ammount made per millisecond
      let total = wageMil * Math.abs(start-date); //calculates total ammount made while timer was running
      this.setState({calcWage:total.toFixed(2)}); //shortens total to 2 decimal points
    }
      
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="text-center">Pay Timer</h1>
        <p>We all know time slows down while you're on the clock. It's the little things that help us get by. Like figuring out how much we just got paid to make a cup of coffee, answer natures call, or simply stare into the abyss.  With this handy timer, you can figure out how much you've made with a press of a button so you can spend company time doing 'better' things.</p> 
          <div class="input-group mb-3">
            
        <input type="number" className="form-control" name="wage" id="wage" placeholder="Hourly Wage" aria-lable="Hourly Wage" aria-describedby="basic-addon2" onChange={(e)=>{this.handleChange(e)}} required/> 
        <div class="input-group-append"> 
 <!-- If timer is running button will say 'Start!', if not running button says 'Stop! -->'
               {!this.state.isRunning ? ( <button className='btn btn-success' onClick={()=>{this.start()}}>Start!</button>)
        : (<button className='btn btn-danger' onClick={()=>{this.stop()}}>Stop!</button>)}
            </div>
          </div>
 <!-- If timer is running show timer, If timer is not running show calculated wage. -->
        {this.state.isRunning ? (<h1 className="text-center">{UTCTime(this.state.start,this.state.date)}</h1>)
        :(<h1 className="text-center">{'$'+this.state.calcWage}</h1>)}
      </div>
    );
  }
}
//initializes clock in application root element. 
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

/* Function formats current UTC time in hours minutes and seconds, given a start and end time. 
 * Return becomes a visual representation of a stopwatch starting at 00:00:00
 */
function UTCTime(start,end) {
  let time = new Date(Math.abs(start-end));
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();
  let seconds = time.getUTCSeconds();
  
  /* Return checks to see if hr/min/sec are single or double digit. 
   * If single digit adds an additional 0 to output for visual consistency
   */
  return (hours<10 ? '0' : '') + String(hours) + ':' + (minutes<10 ? '0' : '') + String(minutes) + ':' + (seconds<10 ? '0' : '') + String(seconds);
}
