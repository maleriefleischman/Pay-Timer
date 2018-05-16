class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wage:0,
      calcWage:0,
      start:new Date(),
      date: new Date()
    };
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  start() {
    if(this.timerID)
      clearInterval(this.timerID); 
    
    this.setState({
      start:new Date(),
      isRunning: true
    })
    this.timerID = setInterval(
      () => this.tick(),
      10
    ); 
  }
  
  stop() {
    clearInterval(this.timerID);
    this.setState({
      isRunning: false
    })
    this.wage();
  }
  
  handleChange(e){
    this.setState({wage:parseInt(e.currentTarget.value)});
  }
  
  wage(){
    const {wage,start,date} = this.state
    if(!wage) 
      this.setState({calcWage:0})
    else {
      let wageMil = wage/60/60/1000;
      let total = wageMil * Math.abs(start-date);
      this.setState({calcWage:total.toFixed(2)});
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
               {!this.state.isRunning ? ( <button className='btn btn-success' onClick={()=>{this.start()}}>Start!</button>)
        : (<button className='btn btn-danger' onClick={()=>{this.stop()}}>Stop!</button>)}
            </div>
          </div>
        {this.state.isRunning ? (<h1 className="text-center">{UTCTime(this.state.start,this.state.date)}</h1>)
        :(<h1 className="text-center">{'$'+this.state.calcWage}</h1>)}
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

function UTCTime(start,end) {
  let time = new Date(Math.abs(start-end));
  let hours = time.getUTCHours();
  let minutes = time.getUTCMinutes();
  let seconds = time.getUTCSeconds();
  return (hours<10 ? '0' : '') + String(hours) + ':' + (minutes<10 ? '0' : '') + String(minutes) + ':' + (seconds<10 ? '0' : '') + String(seconds);
}
