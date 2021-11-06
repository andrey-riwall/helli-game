document.addEventListener('DOMContentLoaded', () => {

  let num = 1;
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.onclick = () => {
    // menu
    const name = document.getElementById('name');
    const menuInput = document.getElementById('menuInput');
    const menu = document.getElementById('menu');
    const menuWarn = document.getElementById('menuWarn');

    if (menuInput.value) {
      name.textContent = menuInput.value;

      menuWarn.classList.remove('is_active');
      menu.classList.add('is_closed');
    } else {
      menuWarn.classList.add('is_active');
    }

    // health
    const table = document.getElementById('table');
    const healthEl = document.getElementById('health');
    healthCount = 50;
    function health () {
      healthCount -= 1;
      healthEl.textContent = healthCount + '%';
      if (healthCount == 0) {
        table.classList.add('is_open');
        newTime();
        num += 1;
      }
      if (table.classList.contains('is_open')) {
        return
      } else {
        setTimeout(health, 1000)
      }
    }

    // timer
    const timeSecEl = document.getElementById('timeSec');
    let timeSec = 0;
    const timeMinEl = document.getElementById('timeMin');
    let timeMin = 0;
    function time () {
      if (table.classList.contains('is_open')) {
        return
      } else {
        timeSec += 1;
        if (timeSec == 60) {
          timeSec = 0;
          timeMin += 1;

          if (timeMin < 10) {
            timeMinEl.textContent = '0' + timeMin;
          } else {
            timeMinEl.textContent = timeMin;
          }
        }

        if (timeSec < 10) {
          timeSecEl.textContent = '0' + timeSec;
        } else {
          timeSecEl.textContent = timeSec;
        }

        setTimeout(time, 1000);
      }
    }
    
    // table
    function newTime () {
      const tableList = document.getElementById('tableList');
      const newTableItem = document.createElement('li');
      tableList.append(newTableItem);
      newTableItem.classList.add('table__item');
      
      const newTableNumber = document.createElement('span');
      newTableItem.append(newTableNumber);
      newTableNumber.textContent = num;
      newTableNumber.classList.add('table__place');

      const newTableName = document.createElement('span');
      newTableItem.append(newTableName);
      newTableName.textContent = name.textContent;
      newTableName.classList.add('table__name');

      const newTableTime = document.createElement('span');
      newTableItem.append(newTableTime);
      newTableTime.textContent = timeMinEl.textContent + ':' + timeSecEl.textContent;
      newTableTime.classList.add('table__time');
    }
    window.newTime = newTime;

    // start
    if (menuInput.value) {
      time();
      health();
      startGame();
      moveHelli();
      menuInput.value = '';
    }
  }

  const tableBtn = document.getElementById('tableBtn');
  tableBtn.onclick = () => {
    table.classList.remove('is_open');
    menu.classList.remove('is_closed');
    const cols = document.querySelectorAll(".col");
    cols.forEach((e) => {
      e.remove();
    });
  }




  // game
  function startGame () {
    // random heights
    function randomHeightsWall(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // random position wall
    function randomPosWall(max) {
      return Math.floor(Math.random() * max);
    }

    // speed of object (not the player)
    let objectSpeed = 50;
    let startPos = -objectSpeed * 2;

    // create new wall
    function newWallFunc () {
      const newWall = document.createElement('div');
      const game = document.getElementById('game');
      game.append(newWall);
      newWall.classList.add('col');
      if (randomPosWall(2)) {
        newWall.classList.add('col-up');
      } else {
        newWall.classList.add('col-down');
      }
      newWall.style.height = randomHeightsWall(99, 351) + 'px';
      newWall.style.right = startPos + 'px';
      
      function moveWall () {
        let pos = -objectSpeed * 2;
        
        function step () {
          pos += objectSpeed;
          newWall.style.right = pos + 'px';
          if (table.classList.contains('is_open')) {
            return
          } else {
            setTimeout(step, 1000);
          }
        }
        step();
      }
      moveWall();


      setTimeout(newWallFunc, 6000);
    }
    newWallFunc();
  }


  // move helli
  function moveHelli () {
    playerSpeed = 50;
  
    const player = document.getElementById('helli');
    let sx = 200;
    let sy = 358;
    player.style.left = sx + 'px';
    player.style.top = sy + 'px';

    // fucn move
    function moveToUp () {
      sy -= playerSpeed;
      player.style.top = sy + 'px';
    }

    function moveToDown () {
      sy += playerSpeed;
      player.style.top = sy + 'px';
    }

    document.addEventListener("keydown",function(e) {
      if (e.key == 'w') {
        if (player.style.top == 8 + 'px') {
        } else {
          if (table.classList.contains('is_open')) {
          } else {
            moveToUp();
          }
        }
      }

      if (e.key == 's') {
        if (player.style.top == 708 + 'px') {
        } else {
          if (table.classList.contains('is_open')) {
          } else {
            moveToDown();
          }
        }
      }
    })
  }



  // physic


})
