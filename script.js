
const avatars = {
                0: "https://www.khanacademy.org/computer-programming/oceanus-seed/5788781288734720/latest.png",
                1: "https://www.khanacademy.org/computer-programming/oceanus-seedling/5920079982477312/latest.png",
                2: "https://www.khanacademy.org/computer-programming/oceanus-sapling/4623563875532800/latest.png",
                3: "https://www.khanacademy.org/computer-programming/oceanus-tree/6605014791733248/latest.png",
                4: "https://www.khanacademy.org/computer-programming/oceanus-tco-2026/5210133879963648/latest.png",
            };
            
            const members = document.getElementById('members')
            let membersList = [
                { name: "", username: "fancypants2006", team: "Oceanus", level: 0 , points:0}, 
                { name: "", username: "@Darkblade_1", team: "Oceanus", level: 0 , points:0}, 
                { name: "", username: "abcde1235", team:"Oceanus", level: 1, points:0},
                { name: "", username: "AaryanRana", team: "Oceanus", level: 1 , points:0}, 
                { name: "", username: "Tompuchay", team: "Oceanus", level: 2 , points:0}, 
                { name: "", username: "c0t", team: "Oceanus", level: 2, points:0},
                { name: "", username: "tdj.ka", team: "Oceanus", level: 2 , points:0}, 
                { name: "", username: "Nxh6", team: "Oceanus", level: 3    , points:0}, 
                { name: "", username: "jdavidsm", team: "Oceanus", level: 3    , points:0},
                { name: "", username: "windawine", team: "Oceanus", level: 3    , points:0}, 
                { name: "", username: "LordFantasy", team: "Oceanus", level: 3   , points:0},
                { name: "", username: "CharlesMartel732", team: "Oceanus", level: 3 , points:0}, 
                { name: "", viceCaptain: true, username: "Lucas7Lee", team: "Oceanus", level: 3    , points:0},
                { name: "", username: "gaminglemonss", captain: true, team: "Oceanus", level: 4   , points:0},  
                { name: "", username: "tr4shc0der", team: "Oceanus", level: 4 , points:0}, 
            ];
            for (let i = 0; i < membersList.length; i ++){
                const member = membersList[i]
                if (!member.captain && !member.viceCaptain) {
                  member.override = member.level
                } else if (member.captain) {
                  member.override = 6;
                } else if (member.viceCaptain){
                  member.override = 5;
                }
            }
            membersList = membersList.sort((a, b) => b.override - a.override);
            document.getElementById("member-count").textContent = `${String(membersList.length)} members`;
            for (let i = 0; i < membersList.length; i ++){
                const card = document.createElement("div")
                const member = membersList[i]
                
                card.innerHTML = `
                <div class="flex w-full justify-center items-center">
                    <div class="text-center ${member.captain||member.viceCaptain?'bg-blue-200/30':'bg-gray-300/20'} rounded-xl p-3 cursor-pointer group transition duration-300 hover:${member.captain||member.viceCaptain?'bg-[var(--theme-color)]':'bg-gray-700/50'} flex flex-col items-center justify-center w-full">
                        <img src=${avatars[member.level]} width='80'>
                        <div class="${member.captain||member.viceCaptain?'bg-blue-300/20':'bg-gray-500/20'} p-1 rounded-lg w-full">
                            <h1 class="text-lg">${member.name}</h1>
                            <h2 class="text-md text-gray-700">@${member.username}</h2>
                        </div>
                    </div>
                </div>`;
                
                card.classList.add('member')
                card.addEventListener('click', function(){
                    window.open(`https://khanacademy.org/profile/${member.username}`)
                })
                
                members.appendChild(card)
            }

















            // ==================== LOGIN SYSTEM ====================
            let users = JSON.parse(localStorage.getItem('oceanus_users') || '{}');
            let currentUser = localStorage.getItem('oceanus_currentUser');
            
            function showToast(message, isError = false) {
                const toast = document.createElement('div');
                toast.className = 'toast-message';
                toast.style.background = isError ? '#ef4444' : '#10b981';
                toast.textContent = message;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2500);
            }
            
            function updateDashboard(userData) {
                document.getElementById('dashboardName').textContent = userData.name;
                document.getElementById('dashboardUsername').textContent = '@' + userData.username;
                document.getElementById('memberSince').textContent = userData.memberSince || new Date().toLocaleDateString();
                document.getElementById('mcPoints').textContent = userData.mcPoints || 0;
                document.getElementById('mangoBalance').textContent = userData.mcPoints || 0;
                const progress = ((userData.mcPoints || 0) % 1000) / 10;
                document.getElementById('mangoProgress').style.width = Math.min(progress, 100) + '%';
                
                if (userData.avatar) {
                    const preview = document.getElementById('avatarPreview');
                    preview.innerHTML = `<img src="${userData.avatar}" style="width:100%;height:100%;object-fit:cover;">`;
                }
            }
            
            function saveUserData(username, data) {
                if (users[username]) {
                    users[username] = { ...users[username], ...data };
                    localStorage.setItem('oceanus_users', JSON.stringify(users));
                    if (currentUser === username) {
                        const saved = localStorage.getItem(`oceanus_userData_${username}`);
                        const fullData = saved ? JSON.parse(saved) : {};
                        localStorage.setItem(`oceanus_userData_${username}`, JSON.stringify({ ...fullData, ...data }));
                    }
                }
            }
            
            function loadDashboard() {
                if (!currentUser || !users[currentUser]) {
                    document.getElementById('loginBox').style.display = 'block';
                    document.getElementById('signupBox').style.display = 'none';
                    document.getElementById('dashboard').style.display = 'none';
                    return;
                }
                const user = users[currentUser];
                document.getElementById('loginBox').style.display = 'none';
                document.getElementById('signupBox').style.display = 'none';
                document.getElementById('dashboard').style.display = 'block';
                updateDashboard(user);
            }
            
            // Games
            window.playGame = function(gameType) {
                if (!currentUser) {
                    showToast('Please login first!', true);
                    return;
                }
                if (gameType === 'clicker') {
                    let clicks = 0;
                    const gameWindow = window.open('', '_blank', 'width=400,height=300');
                    gameWindow.document.write(`
                        <html><head><title>Click Master</title><style>body{font-family:sans-serif;text-align:center;padding:50px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;}button{font-size:2rem;padding:20px 40px;border-radius:60px;border:none;cursor:pointer;background:#ffd700;color:#333;font-weight:bold;}h1{font-size:3rem;}p{font-size:1.2rem;}</style></head>
                        <body><h1>🖱️ Click Master</h1><p>Click the button to earn MC!</p><button id="clickBtn">Click Me!</button><p id="counter">Clicks: 0 | MC Earned: 0</p><script>
                        let clicks = 0; let earned = 0;
                        document.getElementById('clickBtn').onclick = () => {
                            clicks++; earned += 10;
                            document.getElementById('counter').innerText = 'Clicks: ' + clicks + ' | MC Earned: ' + earned;
                            if (clicks >= 10) {
                                window.opener.postMessage({ type: 'gameComplete', game: 'clicker', reward: earned }, '*');
                                alert('You earned ' + earned + ' MC! Closing game...');
                                window.close();
                            }
                        };
                        <\/script></body></html>
                    `);
                } else if (gameType === 'memory') {
                    const gameWindow = window.open('', '_blank', 'width=500,height=500');
                    gameWindow.document.write(`
                        <html><head><title>Memory Match</title><style>
                        body{font-family:sans-serif;text-align:center;padding:20px;background:#1e3c72;color:white;}
                        .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:400px;margin:20px auto;}
                        .card{background:#ffd700;height:80px;display:flex;align-items:center;justify-content:center;font-size:2rem;cursor:pointer;border-radius:10px;color:#333;}
                        .card.flipped{background:#fff;}
                        button{padding:10px 30px;border-radius:30px;border:none;cursor:pointer;margin-top:20px;}
                        </style></head>
                        <body><h2>🧠 Memory Match</h2><p>Match all pairs to earn 50 MC!</p><div class="grid" id="grid"></div><p id="status">Matches: 0 / 6</p><button id="closeBtn">Close</button>
                        <script>
                        const emojis = ['🐠','🐟','🐡','🐙','🦑','🐬','🐠','🐟','🐡','🐙','🦑','🐬'];
                        let shuffled = [...emojis];
                        for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
                        let flipped = [], matched = [], lock = false;
                        function render(){const grid=document.getElementById('grid');grid.innerHTML=shuffled.map((e,i)=>'<div class="card '+(matched.includes(i)||flipped.includes(i)?'flipped':'')+'" onclick="flipCard('+i+')">'+(matched.includes(i)||flipped.includes(i)?e:'?')+'</div>').join('');}
                        window.flipCard = (i) => {if(lock||flipped.includes(i)||matched.includes(i))return;flipped.push(i);render();if(flipped.length===2){lock=true;setTimeout(()=>{if(shuffled[flipped[0]]===shuffled[flipped[1]]){matched.push(...flipped);document.getElementById('status').innerText='Matches: '+matched.length/2+' / 6';if(matched.length===12){alert('You won! +50 MC!');window.opener.postMessage({type:'gameComplete',game:'memory',reward:50},'*');window.close();}}flipped=[];lock=false;render();},500);}};
                        render();
                        document.getElementById('closeBtn').onclick=()=>window.close();
                        <\/script></body></html>
                    `);
                }
            };
            
            window.addEventListener('message', (e) => {
                if (e.data.type === 'gameComplete' && currentUser) {
                    const reward = e.data.reward;
                    if (users[currentUser]) {
                        users[currentUser].mcPoints = (users[currentUser].mcPoints || 0) + reward;
                        localStorage.setItem('oceanus_users', JSON.stringify(users));
                        updateDashboard(users[currentUser]);
                        showToast(`You earned ${reward} MC!`);
                    }
                }
            });
            
            // Avatar upload
            document.getElementById('avatarFile')?.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file && currentUser) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        users[currentUser].avatar = ev.target.result;
                        localStorage.setItem('oceanus_users', JSON.stringify(users));
                        const preview = document.getElementById('avatarPreview');
                        preview.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;">`;
                        showToast('Avatar updated!');
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Login logic
            document.getElementById('loginBtn')?.addEventListener('click', () => {
                const username = document.getElementById('loginUsername').value.trim();
                const password = document.getElementById('loginPassword').value;
                if (users[username] && users[username].password === password) {
                    currentUser = username;
                    localStorage.setItem('oceanus_currentUser', currentUser);
                    loadDashboard();
                    showToast(`Welcome back, ${users[username].name}!`);
                } else {
                    showToast('Invalid username or password', true);
                }
            });
            
            // Signup logic
            document.getElementById('signupBtn')?.addEventListener('click', () => {
                const name = document.getElementById('signupName').value.trim();
                const username = document.getElementById('signupUsername').value.trim();
                const password = document.getElementById('signupPassword').value;
                if (!name || !username || !password) {
                    showToast('Please fill all fields', true);
                    return;
                }
                if (users[username]) {
                    showToast('Username already exists', true);
                    return;
                }
                users[username] = {
                    name: name,
                    username: username,
                    password: password,
                    mcPoints: 100,
                    memberSince: new Date().toLocaleDateString(),
                    avatar: null
                };
                localStorage.setItem('oceanus_users', JSON.stringify(users));
                currentUser = username;
                localStorage.setItem('oceanus_currentUser', currentUser);
                loadDashboard();
                showToast(`Welcome to Oceanus, ${name}! You start with 100 MC.`);
            });
            
            // Toggle forms
            document.getElementById('showSignupBtn')?.addEventListener('click', () => {
                document.getElementById('loginBox').style.display = 'none';
                document.getElementById('signupBox').style.display = 'block';
            });
            document.getElementById('showLoginBtn')?.addEventListener('click', () => {
                document.getElementById('loginBox').style.display = 'block';
                document.getElementById('signupBox').style.display = 'none';
            });
            
            // Logout
            document.getElementById('logoutBtn')?.addEventListener('click', () => {
                currentUser = null;
                localStorage.removeItem('oceanus_currentUser');
                loadDashboard();
                showToast('Logged out successfully');
            });
            
            // Initialize
            loadDashboard();
        
            let typer = new AutoTyping('.quotes', ["The Coding\nOlympics 2026", 'Code, Create\nConquer.', 'Innovating One\nLine At a Time'], { typeSpeed: 90, deleteSpeed: 60, });
            typer.start();
        
            const pages = document.getElementsByClassName("page");
            let naved = false;
            window.nav = (index) => {
                for (let i = 0; i < pages.length; i ++){
                    pages[i].style.display = i === index-1 ? "block" : "none";
                }
                pages[index-1].style.display = "block";
                window.scroll({ top: 0, left: 0, behavior: "smooth" });
                if (document.documentElement.scrollTop === 0 && naved) {
                    window.scroll({ top: 600, left: 0, behavior: "smooth" });
                } else {
                    window.scroll({ top: 0, left: 0, behavior: "smooth" });
                }
                naved = true;
            };
            window.nav(1);
        
            import { animate, scroll, hover, inView, delay } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
            const nav = document.getElementById("nav");
            window.addEventListener("scroll", () => {
                if (document.documentElement.getBoundingClientRect().top > window.innerHeight / 2){
                    nav.classList.add("-translate-y-27")
                    nav.classList.remove("opacity-0", "-translate-y-40");
                } else {
                    nav.classList.add("opacity-0", "-translate-y-40");  
                    nav.classList.remove("-translate-y-27")
                }
            });
            inView(".page h1", (e) => { delay(() => { animate(e, { opacity: 1, y: 0 }) }, 0.1); return () => { animate(e, { opacity: 0, y: -20 }) } });
            inView(".page h2", (e) => { delay(() => { animate(e, { opacity: 1, y: 0 }) }, 0.3); return () => { animate(e, { opacity: 0, y: -20 }) } });
            inView(".page p", (e) => { delay(() => { animate(e, { opacity: 1, y: 0 }) }, 0.4); return () => { animate(e, { opacity: 0, y: -20 }) } });
            hover("nav", (e) => { nav.classList.remove('-translate-y-27'); return () => nav.classList.add("-translate-y-27") });
            window.addEventListener("load", () => { nav.classList.add("transition", "duration-300") });
        

