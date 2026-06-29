
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
