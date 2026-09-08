import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../src/pages/courses/masterclass/[lesson].astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline define:vars=\{\{ lessonNumber:[\s\S]*?\}\}>([\s\S]*?)<\/script>/)[1];
function setup({ lessonNumber = 1, blocked = false, saved = {}, answers = [0,0,0,0,0] } = {}) {
  const storage = new Map(Object.entries(saved));
  const events = [];
  const handlers = new Map();
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { style: {}, innerHTML: '', textContent: '', addEventListener: (name, fn) => handlers.set(id + ':' + name, fn), prepend() {}, scrollIntoView() {} });
    return elements.get(id);
  };
  const questions = answers.map(answer => ({ getAttribute: () => '0', querySelector: () => ({ value: String(answer) }), querySelectorAll: () => [0,1,2].map(() => ({ classList: { add() {}, remove() {} } })) }));
  const document = { getElementById: element, querySelectorAll: () => questions, addEventListener: (name,fn) => handlers.set(name,fn), createElement: () => ({ setAttribute() {} }) };
  const localStorage = { getItem: key => { if(blocked) throw Error('blocked'); return storage.get(key) ?? null; }, setItem: (key,val) => { if(blocked) throw Error('blocked'); storage.set(key,String(val)); }, removeItem: key => storage.delete(key) };
  vm.runInNewContext(script,{document,localStorage,lessonNumber,totalLessons:9,window:{location:{pathname:'/courses/masterclass/lesson-'+lessonNumber+'/'},gtag:(...args)=>events.push(args)}});
  handlers.get('DOMContentLoaded')();
  return { element, events, storage, submit: () => handlers.get('quiz-form:submit')({preventDefault(){}}) };
}
test('a failed quiz records its score without unlocking the next lesson',()=>{
  const app=setup({answers:[0,0,1,1,1]}); app.submit();
  assert.equal(app.storage.get('urai-mc-lesson-1-complete'),undefined);
  assert.equal(app.events.filter(e=>e[1]==='course_quiz_result')[0][2].score_percent,40);
  assert.equal(app.events.some(e=>e[1]==='course_lesson_complete'),false);
  assert.notEqual(app.element('next-lesson-link').style.display,'inline-block');
});
test('passing unlocks progression; revisiting does not emit another completion',()=>{
  const app=setup(); app.submit();
  assert.equal(app.storage.get('urai-mc-lesson-1-complete'),'true');
  assert.equal(app.element('next-lesson-link').style.display,'inline-block');
  assert.equal(app.events.filter(e=>e[1]==='course_lesson_complete').length,1);
  const revisit=setup({saved:Object.fromEntries(app.storage)});
  assert.equal(revisit.events.some(e=>e[1]==='course_lesson_complete'),false);
});
test('locked lessons do not count as lesson starts',()=>{
  const app=setup({lessonNumber:2});
  assert.equal(app.element('lesson-content').style.display,'none');
  assert.equal(app.events.length,0);
});
test('blocked storage leaves reading, grading and the next link usable',()=>{
  const app=setup({lessonNumber:2,blocked:true}); app.submit();
  assert.notEqual(app.element('lesson-content').style.display,'none');
  assert.equal(app.element('next-lesson-link').style.display,'inline-block');
  assert.equal(app.events.find(e=>e[1]==='course_lesson_complete')[2].progress_storage,'unavailable');
});
test('course completion requires all nine quizzes, not an ordinary lesson pass',()=>{
  const saved=Object.fromEntries(Array.from({length:8},(_,i)=>['urai-mc-lesson-'+(i+1)+'-complete','true']));
  const app=setup({lessonNumber:9,saved});app.submit();
  assert.equal(app.events.filter(e=>e[1]==='course_complete').length,1);
});
