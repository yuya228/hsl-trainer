(function(){
'use strict';
function rank(score){
  if(score===100)return 'SS';
  if(score>=90)return 'S';
  if(score>=80)return 'A';
  if(score>=70)return 'B';
  if(score>=60)return 'C';
  return 'D';
}
function gradeColor(g){
  if(g==='SS'||g==='S')return 'var(--yellow)';
  if(g==='A')return 'var(--green)';
  if(g==='B')return 'var(--blue)';
  return 'var(--muted)';
}
function syncQuestion(){
  var screen=document.getElementById('questionResultScreen');
  if(!screen||!screen.classList.contains('active'))return;
  var scoreEl=document.getElementById('questionScore');
  var badge=document.getElementById('gradeBadge');
  if(!scoreEl||!badge)return;
  var score=parseInt(scoreEl.textContent,10);
  if(isNaN(score))return;
  var g=rank(score);
  if(badge.textContent!==g)badge.textContent=g;
  var cls='grade-badge '+g.toLowerCase();
  if(badge.className!==cls)badge.className=cls;
}
function syncSummary(){
  var screen=document.getElementById('summaryScreen');
  if(!screen||!screen.classList.contains('active'))return;
  screen.querySelectorAll('.round-item').forEach(function(row){
    var scoreEl=row.querySelector('.round-score');
    var gradeEl=row.querySelector('.round-grade');
    if(!scoreEl||!gradeEl)return;
    var score=parseInt(scoreEl.textContent,10);
    if(isNaN(score))return;
    var g=rank(score);
    if(gradeEl.textContent!==g)gradeEl.textContent=g;
    gradeEl.style.color=gradeColor(g);
  });
}
function sync(){syncQuestion();syncSummary()}
var observer=new MutationObserver(sync);
observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
['judgeBtn','nextBtn'].forEach(function(id){
  var el=document.getElementById(id);
  if(el)el.addEventListener('click',function(){setTimeout(sync,0)});
});
sync();
})();
