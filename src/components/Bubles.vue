<template>
  <div class="canvas">
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
  </div>
</template>

<style scoped>
.canvas {
  height: 100vh;
  width: 100%;
  /* background: linear-gradient(to bottom, #edfffa 0%, #31c5d6 100%); */
  position: relative;
  overflow: hidden;
}
.bubble {
  display: block;
  border-radius: 100%;
  opacity: 0.8;
  position: absolute;
}
.bubble:nth-child(1) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 67px;
  height: 67px;
  left: 11vw;
  bottom: 5vh;
  -webkit-animation: move1 infinite 6s;
  animation: move1 infinite 6s;
}
@-webkit-keyframes move1 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 57vh;
    transform: translate(153px, 0);
    opacity: 0;
  }
}
@keyframes move1 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 57vh;
    transform: translate(153px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(2) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 65px;
  height: 65px;
  left: 41vw;
  bottom: 76vh;
  -webkit-animation: move2 infinite 5s;
  animation: move2 infinite 5s;
}
@-webkit-keyframes move2 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 3vh;
    transform: translate(75px, 0);
    opacity: 0;
  }
}
@keyframes move2 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 3vh;
    transform: translate(75px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(3) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 18px;
  height: 18px;
  left: 69vw;
  bottom: 61vh;
  -webkit-animation: move3 infinite 15s;
  animation: move3 infinite 15s;
}
@-webkit-keyframes move3 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 31vh;
    transform: translate(-42px, 0);
    opacity: 0;
  }
}
@keyframes move3 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 31vh;
    transform: translate(-42px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(4) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 39px;
  height: 39px;
  left: 82vw;
  bottom: 64vh;
  -webkit-animation: move4 infinite 15s;
  animation: move4 infinite 15s;
}
@-webkit-keyframes move4 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 2vh;
    transform: translate(143px, 0);
    opacity: 0;
  }
}
@keyframes move4 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 2vh;
    transform: translate(143px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(5) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 80px;
  height: 80px;
  left: 16vw;
  bottom: 69vh;
  -webkit-animation: move5 infinite 8s;
  animation: move5 infinite 8s;
}
@-webkit-keyframes move5 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 35vh;
    transform: translate(43px, 0);
    opacity: 0;
  }
}
@keyframes move5 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 35vh;
    transform: translate(43px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(6) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 25px;
  height: 25px;
  left: 49vw;
  bottom: 54vh;
  -webkit-animation: move6 infinite 3s;
  animation: move6 infinite 3s;
}
@-webkit-keyframes move6 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 39vh;
    transform: translate(-30px, 0);
    opacity: 0;
  }
}
@keyframes move6 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 39vh;
    transform: translate(-30px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(7) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 38px;
  height: 38px;
  left: 64vw;
  bottom: 39vh;
  -webkit-animation: move7 infinite 5s;
  animation: move7 infinite 5s;
}
@-webkit-keyframes move7 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 95vh;
    transform: translate(122px, 0);
    opacity: 0;
  }
}
@keyframes move7 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 95vh;
    transform: translate(122px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(8) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 41px;
  height: 41px;
  left: 33vw;
  bottom: 91vh;
  -webkit-animation: move8 infinite 11s;
  animation: move8 infinite 11s;
}
@-webkit-keyframes move8 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 36vh;
    transform: translate(104px, 0);
    opacity: 0;
  }
}
@keyframes move8 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 36vh;
    transform: translate(104px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(9) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 68px;
  height: 68px;
  left: 27vw;
  bottom: 38vh;
  -webkit-animation: move9 infinite 4s;
  animation: move9 infinite 4s;
}
@-webkit-keyframes move9 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 22vh;
    transform: translate(137px, 0);
    opacity: 0;
  }
}
@keyframes move9 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 22vh;
    transform: translate(137px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(10) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 39px;
  height: 39px;
  left: 36vw;
  bottom: 27vh;
  -webkit-animation: move10 infinite 11s;
  animation: move10 infinite 11s;
}
@-webkit-keyframes move10 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    transform: translate(-72px, 0);
    opacity: 0;
  }
}
@keyframes move10 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    transform: translate(-72px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(11) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 76px;
  height: 76px;
  left: 98vw;
  bottom: 58vh;
  -webkit-animation: move11 infinite 12s;
  animation: move11 infinite 12s;
}
@-webkit-keyframes move11 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 49vh;
    transform: translate(177px, 0);
    opacity: 0;
  }
}
@keyframes move11 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 49vh;
    transform: translate(177px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(12) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 36px;
  height: 36px;
  left: 98vw;
  bottom: 40vh;
  -webkit-animation: move12 infinite 14s;
  animation: move12 infinite 14s;
}
@-webkit-keyframes move12 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 94vh;
    transform: translate(143px, 0);
    opacity: 0;
  }
}
@keyframes move12 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 94vh;
    transform: translate(143px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(13) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 21px;
  height: 21px;
  left: 10vw;
  bottom: 9vh;
  -webkit-animation: move13 infinite 7s;
  animation: move13 infinite 7s;
}
@-webkit-keyframes move13 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 17vh;
    transform: translate(-80px, 0);
    opacity: 0;
  }
}
@keyframes move13 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 17vh;
    transform: translate(-80px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(14) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 6px;
  height: 6px;
  left: 24vw;
  bottom: 71vh;
  -webkit-animation: move14 infinite 13s;
  animation: move14 infinite 13s;
}
@-webkit-keyframes move14 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 91vh;
    transform: translate(-72px, 0);
    opacity: 0;
  }
}
@keyframes move14 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 91vh;
    transform: translate(-72px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(15) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 59px;
  height: 59px;
  left: 95vw;
  bottom: 55vh;
  -webkit-animation: move15 infinite 11s;
  animation: move15 infinite 11s;
}
@-webkit-keyframes move15 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 24vh;
    transform: translate(79px, 0);
    opacity: 0;
  }
}
@keyframes move15 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 24vh;
    transform: translate(79px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(16) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 50px;
  height: 50px;
  left: 91vw;
  bottom: 89vh;
  -webkit-animation: move16 infinite 10s;
  animation: move16 infinite 10s;
}
@-webkit-keyframes move16 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 80vh;
    transform: translate(-71px, 0);
    opacity: 0;
  }
}
@keyframes move16 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 80vh;
    transform: translate(-71px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(17) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 82px;
  height: 82px;
  left: 89vw;
  bottom: 6vh;
  -webkit-animation: move17 infinite 10s;
  animation: move17 infinite 10s;
}
@-webkit-keyframes move17 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 84vh;
    transform: translate(-9px, 0);
    opacity: 0;
  }
}
@keyframes move17 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 84vh;
    transform: translate(-9px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(18) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 8px;
  height: 8px;
  left: 71vw;
  bottom: 54vh;
  -webkit-animation: move18 infinite 8s;
  animation: move18 infinite 8s;
}
@-webkit-keyframes move18 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 12vh;
    transform: translate(122px, 0);
    opacity: 0;
  }
}
@keyframes move18 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 12vh;
    transform: translate(122px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(19) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 99px;
  height: 99px;
  left: 49vw;
  bottom: 22vh;
  -webkit-animation: move19 infinite 12s;
  animation: move19 infinite 12s;
}
@-webkit-keyframes move19 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 67vh;
    transform: translate(18px, 0);
    opacity: 0;
  }
}
@keyframes move19 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 67vh;
    transform: translate(18px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(20) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 30px;
  height: 30px;
  left: 34vw;
  bottom: 100vh;
  -webkit-animation: move20 infinite 4s;
  animation: move20 infinite 4s;
}
@-webkit-keyframes move20 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 48vh;
    transform: translate(143px, 0);
    opacity: 0;
  }
}
@keyframes move20 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 48vh;
    transform: translate(143px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(21) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 31px;
  height: 31px;
  left: 21vw;
  bottom: 68vh;
  -webkit-animation: move21 infinite 12s;
  animation: move21 infinite 12s;
}
@-webkit-keyframes move21 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 13vh;
    transform: translate(-62px, 0);
    opacity: 0;
  }
}
@keyframes move21 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 13vh;
    transform: translate(-62px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(22) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 57px;
  height: 57px;
  left: 83vw;
  bottom: 48vh;
  -webkit-animation: move22 infinite 11s;
  animation: move22 infinite 11s;
}
@-webkit-keyframes move22 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 89vh;
    transform: translate(129px, 0);
    opacity: 0;
  }
}
@keyframes move22 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 89vh;
    transform: translate(129px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(23) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 45px;
  height: 45px;
  left: 48vw;
  bottom: 11vh;
  -webkit-animation: move23 infinite 9s;
  animation: move23 infinite 9s;
}
@-webkit-keyframes move23 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 58vh;
    transform: translate(-55px, 0);
    opacity: 0;
  }
}
@keyframes move23 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 58vh;
    transform: translate(-55px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(24) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 95px;
  height: 95px;
  left: 84vw;
  bottom: 73vh;
  -webkit-animation: move24 infinite 10s;
  animation: move24 infinite 10s;
}
@-webkit-keyframes move24 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 81vh;
    transform: translate(69px, 0);
    opacity: 0;
  }
}
@keyframes move24 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 81vh;
    transform: translate(69px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(25) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 90px;
  height: 90px;
  left: 26vw;
  bottom: 39vh;
  -webkit-animation: move25 infinite 6s;
  animation: move25 infinite 6s;
}
@-webkit-keyframes move25 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 42vh;
    transform: translate(97px, 0);
    opacity: 0;
  }
}
@keyframes move25 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 42vh;
    transform: translate(97px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(26) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 93px;
  height: 93px;
  left: 29vw;
  bottom: 88vh;
  -webkit-animation: move26 infinite 6s;
  animation: move26 infinite 6s;
}
@-webkit-keyframes move26 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 0vh;
    transform: translate(76px, 0);
    opacity: 0;
  }
}
@keyframes move26 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 0vh;
    transform: translate(76px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(27) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 88px;
  height: 88px;
  left: 13vw;
  bottom: 41vh;
  -webkit-animation: move27 infinite 4s;
  animation: move27 infinite 4s;
}
@-webkit-keyframes move27 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 74vh;
    transform: translate(116px, 0);
    opacity: 0;
  }
}
@keyframes move27 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 74vh;
    transform: translate(116px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(28) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 72px;
  height: 72px;
  left: 27vw;
  bottom: 36vh;
  -webkit-animation: move28 infinite 13s;
  animation: move28 infinite 13s;
}
@-webkit-keyframes move28 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 11vh;
    transform: translate(86px, 0);
    opacity: 0;
  }
}
@keyframes move28 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 11vh;
    transform: translate(86px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(29) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 61px;
  height: 61px;
  left: 54vw;
  bottom: 71vh;
  -webkit-animation: move29 infinite 14s;
  animation: move29 infinite 14s;
}
@-webkit-keyframes move29 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 78vh;
    transform: translate(-89px, 0);
    opacity: 0;
  }
}
@keyframes move29 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 78vh;
    transform: translate(-89px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(30) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 59px;
  height: 59px;
  left: 96vw;
  bottom: 32vh;
  -webkit-animation: move30 infinite 7s;
  animation: move30 infinite 7s;
}
@-webkit-keyframes move30 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 93vh;
    transform: translate(125px, 0);
    opacity: 0;
  }
}
@keyframes move30 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 93vh;
    transform: translate(125px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(31) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 64px;
  height: 64px;
  left: 34vw;
  bottom: 83vh;
  -webkit-animation: move31 infinite 15s;
  animation: move31 infinite 15s;
}
@-webkit-keyframes move31 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 41vh;
    transform: translate(-70px, 0);
    opacity: 0;
  }
}
@keyframes move31 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 41vh;
    transform: translate(-70px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(32) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 72px;
  height: 72px;
  left: 6vw;
  bottom: 74vh;
  -webkit-animation: move32 infinite 6s;
  animation: move32 infinite 6s;
}
@-webkit-keyframes move32 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 23vh;
    transform: translate(-5px, 0);
    opacity: 0;
  }
}
@keyframes move32 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 23vh;
    transform: translate(-5px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(33) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 27px;
  height: 27px;
  left: 84vw;
  bottom: 61vh;
  -webkit-animation: move33 infinite 14s;
  animation: move33 infinite 14s;
}
@-webkit-keyframes move33 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 18vh;
    transform: translate(190px, 0);
    opacity: 0;
  }
}
@keyframes move33 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 18vh;
    transform: translate(190px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(34) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 21px;
  height: 21px;
  left: 2vw;
  bottom: 51vh;
  -webkit-animation: move34 infinite 4s;
  animation: move34 infinite 4s;
}
@-webkit-keyframes move34 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 32vh;
    transform: translate(123px, 0);
    opacity: 0;
  }
}
@keyframes move34 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 32vh;
    transform: translate(123px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(35) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 54px;
  height: 54px;
  left: 4vw;
  bottom: 82vh;
  -webkit-animation: move35 infinite 3s;
  animation: move35 infinite 3s;
}
@-webkit-keyframes move35 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 76vh;
    transform: translate(122px, 0);
    opacity: 0;
  }
}
@keyframes move35 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 76vh;
    transform: translate(122px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(36) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 44px;
  height: 44px;
  left: 72vw;
  bottom: 28vh;
  -webkit-animation: move36 infinite 15s;
  animation: move36 infinite 15s;
}
@-webkit-keyframes move36 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 20vh;
    transform: translate(174px, 0);
    opacity: 0;
  }
}
@keyframes move36 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 20vh;
    transform: translate(174px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(37) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 64px;
  height: 64px;
  left: 46vw;
  bottom: 12vh;
  -webkit-animation: move37 infinite 4s;
  animation: move37 infinite 4s;
}
@-webkit-keyframes move37 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 8vh;
    transform: translate(89px, 0);
    opacity: 0;
  }
}
@keyframes move37 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 8vh;
    transform: translate(89px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(38) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 66px;
  height: 66px;
  left: 75vw;
  bottom: 13vh;
  -webkit-animation: move38 infinite 3s;
  animation: move38 infinite 3s;
}
@-webkit-keyframes move38 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 73vh;
    transform: translate(-8px, 0);
    opacity: 0;
  }
}
@keyframes move38 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 73vh;
    transform: translate(-8px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(39) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 44px;
  height: 44px;
  left: 76vw;
  bottom: 61vh;
  -webkit-animation: move39 infinite 12s;
  animation: move39 infinite 12s;
}
@-webkit-keyframes move39 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 57vh;
    transform: translate(192px, 0);
    opacity: 0;
  }
}
@keyframes move39 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 57vh;
    transform: translate(192px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(40) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 41px;
  height: 41px;
  left: 57vw;
  bottom: 80vh;
  -webkit-animation: move40 infinite 8s;
  animation: move40 infinite 8s;
}
@-webkit-keyframes move40 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 37vh;
    transform: translate(-69px, 0);
    opacity: 0;
  }
}
@keyframes move40 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 37vh;
    transform: translate(-69px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(41) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 84px;
  height: 84px;
  left: 98vw;
  bottom: 49vh;
  -webkit-animation: move41 infinite 3s;
  animation: move41 infinite 3s;
}
@-webkit-keyframes move41 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 8vh;
    transform: translate(138px, 0);
    opacity: 0;
  }
}
@keyframes move41 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 8vh;
    transform: translate(138px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(42) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 41px;
  height: 41px;
  left: 85vw;
  bottom: 32vh;
  -webkit-animation: move42 infinite 10s;
  animation: move42 infinite 10s;
}
@-webkit-keyframes move42 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 86vh;
    transform: translate(4px, 0);
    opacity: 0;
  }
}
@keyframes move42 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 86vh;
    transform: translate(4px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(43) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 33px;
  height: 33px;
  left: 56vw;
  bottom: 22vh;
  -webkit-animation: move43 infinite 10s;
  animation: move43 infinite 10s;
}
@-webkit-keyframes move43 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 57vh;
    transform: translate(171px, 0);
    opacity: 0;
  }
}
@keyframes move43 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 57vh;
    transform: translate(171px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(44) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 71px;
  height: 71px;
  left: 25vw;
  bottom: 37vh;
  -webkit-animation: move44 infinite 8s;
  animation: move44 infinite 8s;
}
@-webkit-keyframes move44 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 44vh;
    transform: translate(100px, 0);
    opacity: 0;
  }
}
@keyframes move44 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 44vh;
    transform: translate(100px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(45) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 18px;
  height: 18px;
  left: 68vw;
  bottom: 60vh;
  -webkit-animation: move45 infinite 7s;
  animation: move45 infinite 7s;
}
@-webkit-keyframes move45 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 11vh;
    transform: translate(-76px, 0);
    opacity: 0;
  }
}
@keyframes move45 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 11vh;
    transform: translate(-76px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(46) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 65px;
  height: 65px;
  left: 66vw;
  bottom: 48vh;
  -webkit-animation: move46 infinite 9s;
  animation: move46 infinite 9s;
}
@-webkit-keyframes move46 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 2vh;
    transform: translate(129px, 0);
    opacity: 0;
  }
}
@keyframes move46 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 2vh;
    transform: translate(129px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(47) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 30px;
  height: 30px;
  left: 100vw;
  bottom: 66vh;
  -webkit-animation: move47 infinite 13s;
  animation: move47 infinite 13s;
}
@-webkit-keyframes move47 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 83vh;
    transform: translate(-86px, 0);
    opacity: 0;
  }
}
@keyframes move47 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 83vh;
    transform: translate(-86px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(48) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 62px;
  height: 62px;
  left: 76vw;
  bottom: 15vh;
  -webkit-animation: move48 infinite 14s;
  animation: move48 infinite 14s;
}
@-webkit-keyframes move48 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 81vh;
    transform: translate(-82px, 0);
    opacity: 0;
  }
}
@keyframes move48 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 81vh;
    transform: translate(-82px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(49) {
  background: radial-gradient(ellipse at center, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 24px;
  height: 24px;
  left: 28vw;
  bottom: 91vh;
  -webkit-animation: move49 infinite 11s;
  animation: move49 infinite 11s;
}
@-webkit-keyframes move49 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 94vh;
    transform: translate(-100px, 0);
    opacity: 0;
  }
}
@keyframes move49 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 94vh;
    transform: translate(-100px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(50) {
  background: radial-gradient(ellipse at top right, #b8c6c6 0%, #30b3d3 46%, #20628c 100%);
  width: 96px;
  height: 96px;
  left: 97vw;
  bottom: 15vh;
  -webkit-animation: move50 infinite 8s;
  animation: move50 infinite 8s;
}
@-webkit-keyframes move50 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 64vh;
    transform: translate(148px, 0);
    opacity: 0;
  }
}
@keyframes move50 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 64vh;
    transform: translate(148px, 0);
    opacity: 0;
  }
}
</style>
