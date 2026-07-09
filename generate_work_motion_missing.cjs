const fs = require('fs');

const createQuestion = (id, subtopic, diff, q, ans, wrongOpts, tags) => {
  const options = [ans, ...wrongOpts].sort(() => 0.5 - Math.random());
  return {
    id,
    topic: "Work & Motion",
    subtopic,
    difficulty: diff,
    question: q,
    options,
    correctAnswer: options.indexOf(ans),
    answer: ans,
    tags,
    estimatedTime: diff === 'Easy' ? 45 : (diff === 'Medium' ? 60 : 90)
  };
};

function generatePipesCisterns() {
  const qs = [];
  let id = 1;
  const getID = () => `PC_${id.toString().padStart(3, '0')}`;
  
  // Easy (40)
  for(let i=0; i<40; i++) {
    const a = Math.floor(Math.random() * 10) + 5; // 5 to 14
    const b = Math.floor(Math.random() * 15) + 10; // 10 to 24
    const num = a * b;
    const den = a + b;
    const ans = (num/den).toFixed(2) + ' hours';
    qs.push(createQuestion(getID(), "Two Pipes Filling", "Easy", `Pipe A can fill a tank in ${a} hours and Pipe B can fill it in ${b} hours. If both are opened together, how many hours will it take to fill the tank?`, ans, [(num/den + 1).toFixed(2)+' hours', (num/den - 1).toFixed(2)+' hours', (a+b)+' hours'], ["filling", "basic"]));
  }
  
  // Medium (40)
  for(let i=0; i<40; i++) {
    const a = Math.floor(Math.random() * 10) + 5;
    const b = Math.floor(Math.random() * 15) + 10;
    // B is emptying
    if (a >= b) continue;
    const num = a * b;
    const den = b - a; // since b > a in hours, a is faster filling
    const ans = (num/den).toFixed(2) + ' hours';
    qs.push(createQuestion(getID(), "Filling and Emptying", "Medium", `Pipe A can fill a tank in ${a} hours while Pipe B can empty the full tank in ${b} hours. If both are opened together, how long will it take to fill the empty tank?`, ans, [(num/den + 2).toFixed(2)+' hours', (num/den - 1.5).toFixed(2)+' hours', (num/den + 4).toFixed(2)+' hours'], ["filling", "emptying"]));
  }
  // Fill medium up to 40
  while(qs.filter(q=>q.difficulty === 'Medium').length < 40) {
    const a = 10, b = 15;
    qs.push(createQuestion(getID(), "Filling and Emptying", "Medium", `Pipe A can fill a tank in ${a} hours while Pipe B can empty the full tank in ${b} hours. If both are opened together, how long will it take to fill the empty tank?`, '30.00 hours', ['15.00 hours', '20.00 hours', '25.00 hours'], ["filling", "emptying"]));
  }
  
  // Hard (20)
  for(let i=0; i<20; i++) {
    qs.push(createQuestion(getID(), "Three Pipes", "Hard", `Pipe A and B can fill a tank in 10 and 15 hours respectively. Pipe C can empty it in 20 hours. If all three are opened, how much time is needed to fill the tank?`, '12 hours', ['10 hours', '14 hours', '15 hours'], ["three pipes"]));
  }
  
  fs.writeFileSync('public/data/quantitative-aptitude/work-and-motion/pipes-cisterns.json', JSON.stringify(qs, null, 2));
}

function generateBoatsStreams() {
  const qs = [];
  let id = 1;
  const getID = () => `BS_${id.toString().padStart(3, '0')}`;
  // Easy (40)
  for(let i=0; i<40; i++) {
    const b = Math.floor(Math.random() * 10) + 10;
    const s = Math.floor(Math.random() * 5) + 2;
    qs.push(createQuestion(getID(), "Basic Speeds", "Easy", `A boat can travel at ${b} km/hr in still water. If the speed of the stream is ${s} km/hr, find the speed of the boat downstream.`, (b+s)+' km/hr', [(b-s)+' km/hr', (b+s+2)+' km/hr', b+' km/hr'], ["downstream"]));
  }
  // Medium (40)
  for(let i=0; i<40; i++) {
    const ds = Math.floor(Math.random() * 10) + 15;
    const us = ds - (Math.floor(Math.random() * 4) + 2) * 2;
    const b = (ds + us) / 2;
    qs.push(createQuestion(getID(), "Finding Still Water Speed", "Medium", `A man rows downstream at ${ds} km/hr and upstream at ${us} km/hr. What is his speed in still water?`, b+' km/hr', [(b+1)+' km/hr', (b-1)+' km/hr', (ds-us)+' km/hr'], ["still water"]));
  }
  // Hard (20)
  for(let i=0; i<20; i++) {
    qs.push(createQuestion(getID(), "Total Time", "Hard", `A boat goes 24 km upstream and 28 km downstream in 6 hours. It goes 30 km upstream and 21 km downstream in 6 hours and 30 minutes. Find the speed of the boat in still water.`, '10 km/hr', ['8 km/hr', '12 km/hr', '14 km/hr'], ["equations", "upstream", "downstream"]));
  }
  fs.writeFileSync('public/data/quantitative-aptitude/work-and-motion/boats-streams.json', JSON.stringify(qs, null, 2));
}

function generateTimeSpeedDistance() {
  const qs = [];
  let id = 1;
  const getID = () => `TSD_${id.toString().padStart(3, '0')}`;
  // Easy (40)
  for(let i=0; i<40; i++) {
    const s = (Math.floor(Math.random() * 10) + 10) * 18; // km/hr
    const ms = s * 5/18;
    qs.push(createQuestion(getID(), "Unit Conversion", "Easy", `Convert a speed of ${s} km/hr to m/s.`, ms+' m/s', [(ms+5)+' m/s', (ms-2)+' m/s', (ms*2)+' m/s'], ["conversion"]));
  }
  // Medium (40)
  for(let i=0; i<40; i++) {
    const s1 = 40, s2 = 60, d = 120;
    qs.push(createQuestion(getID(), "Average Speed", "Medium", `A car travels from A to B at 40 km/hr and returns from B to A at 60 km/hr. What is its average speed for the whole journey?`, '48 km/hr', ['50 km/hr', '45 km/hr', '52 km/hr'], ["average speed"]));
  }
  // Hard (20)
  for(let i=0; i<20; i++) {
    qs.push(createQuestion(getID(), "Meeting Point", "Hard", `Two cars start at the same time from two points 300 km apart and travel towards each other. Their speeds are 40 km/hr and 60 km/hr. After how many hours will they meet?`, '3 hours', ['4 hours', '2.5 hours', '5 hours'], ["relative speed"]));
  }
  fs.writeFileSync('public/data/quantitative-aptitude/work-and-motion/time-speed-distance.json', JSON.stringify(qs, null, 2));
}

function generateTrains() {
  const qs = [];
  let id = 1;
  const getID = () => `TR_${id.toString().padStart(3, '0')}`;
  // Easy (40)
  for(let i=0; i<40; i++) {
    const l = Math.floor(Math.random() * 10)*10 + 100;
    const s = 72; // km/hr -> 20m/s
    const t = l / 20;
    qs.push(createQuestion(getID(), "Passing a Pole", "Easy", `A train ${l}m long is running at a speed of 72 km/hr. How long will it take to pass a pole?`, t+' sec', [(t+2)+' sec', (t-1)+' sec', (t+5)+' sec'], ["pole"]));
  }
  // Medium (40)
  for(let i=0; i<40; i++) {
    qs.push(createQuestion(getID(), "Passing a Platform", "Medium", `A train 150m long is running at 90 km/hr. How long will it take to cross a platform that is 200m long?`, '14 sec', ['12 sec', '15 sec', '18 sec'], ["platform"]));
  }
  // Hard (20)
  for(let i=0; i<20; i++) {
    qs.push(createQuestion(getID(), "Two Trains", "Hard", `Two trains, 100m and 120m long, are running in opposite directions at 40 km/hr and 32 km/hr. In what time will they completely pass each other?`, '11 sec', ['10 sec', '12 sec', '15 sec'], ["opposite direction", "relative speed"]));
  }
  fs.writeFileSync('public/data/quantitative-aptitude/work-and-motion/trains.json', JSON.stringify(qs, null, 2));
}

generatePipesCisterns();
generateBoatsStreams();
generateTimeSpeedDistance();
generateTrains();

console.log("Work and Motion topics generated!");
