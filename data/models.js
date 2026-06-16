/* Comparison facts — drives the home matrix. fact = { value, cites:[keys into CITES] }. */
window.AXES = [
  { key:"parent",  label:"Base model" },
  { key:"inputs",  label:"Input" },
  { key:"outputs", label:"Action output" },
  { key:"arch",    label:"Mechanism" },
  { key:"eval",    label:"Official eval (Val-Unseen)" },
];

window.MODELS = [
  {
    slug:"navila", name:"NaVILA", tag:"Llama-3-8B · RSS 2025", page:"navila.html",
    facts:{
      parent:  { value:"Llama-3-8B + SigLIP (VILA-based)", cites:["nav:parent","nav:arch"] },
      inputs:  { value:"8-frame video clip, 1 current + 7 sampled history", cites:["nav:in","nav:frames"] },
      outputs: { value:"Language, variable magnitude (“turn right 30 degrees”)", cites:["nav:out"] },
      arch:    { value:"Two-level: VLA language → RL locomotion policy", cites:["nav:arch"] },
      eval:    { value:"R2R-CE SR 54.0", cites:["nav:eval"] },
    }
  },
  {
    slug:"uninavid", name:"Uni-NaVid", tag:"Vicuna-7B · RSS 2025", page:"uninavid.html",
    facts:{
      parent:  { value:"Vicuna-7B + EVA-CLIP ViT-G", cites:["uni:parent","uni:ckpt"] },
      inputs:  { value:"Streaming RGB video, 1 frame per step", cites:["uni:in","uni:frame"] },
      outputs: { value:"Text words, fixed 0.25 m / 30°, 4 per inference", cites:["uni:out","uni:step"] },
      arch:    { value:"Online token merging: merge when cosine similarity exceeds τ = 0.95", cites:["uni:arch","uni:tau"] },
      eval:    { value:"R2R SR 47.0 · ObjectNav HM3D SR 73.7", cites:["uni:T2","uni:T4"] },
    }
  },
  {
    slug:"streamvln", name:"StreamVLN", tag:"Qwen2-7B · 2025", page:"streamvln.html",
    facts:{
      parent:  { value:"Qwen2-7B + SigLIP (LLaVA-Video)", cites:["str:parent","str:vision"] },
      inputs:  { value:"Streaming video, sliding window + pruned memory", cites:["str:in"] },
      outputs: { value:"Symbols ↑ ← → STOP → IDs, 0.25 m / 15°", cites:["str:out"] },
      arch:    { value:"SlowFast: sliding-window KV cache + token pruning", cites:["str:arch"] },
      eval:    { value:"R2R SR 56.9", cites:["str:eval"] },
    }
  },
  {
    slug:"omnivla", name:"OmniVLA", tag:"Llama-2-7B · ICRA 2026", page:"omnivla.html",
    facts:{
      parent:  { value:"Llama-2-7B + SigLIP/DINOv2 (OpenVLA-OFT)", cites:["omn:llm","omn:vision","omn:parent"] },
      inputs:  { value:"Single frame + goal (pose / image / language)", cites:["omn:arch"] },
      outputs: { value:"Continuous 8-waypoint trajectory, each (dx, dy, hx, hy)", cites:["omn:out","omn:chunk"] },
      arch:    { value:"Omni-modal goal conditioning, linear waypoint head", cites:["omn:parent","omn:arch"] },
      eval:    { value:"Real-world, no VLN-CE (lang-goal SR 0.73)", cites:["omn:eval"] },
    }
  },
  {
    slug:"qwen-vla", name:"Qwen-VLA", tag:"Qwen3.5-4B · 2026", page:"qwen-vla.html", watch:true,
    facts:{
      parent:  { value:"Qwen3.5-4B + 1.15B DiT decoder", cites:["qwen:arch"] },
      inputs:  { value:"Images/video + embodiment text prompt", cites:["qwen:arch"] },
      outputs: { value:"Flow-matching chunks; nav (Δx, Δy, Δθ)", cites:["qwen:out"] },
      arch:    { value:"VLM backbone + DiT action decoder, one generalist", cites:["qwen:arch"] },
      eval:    { value:"R2R SR 57.5 (paper-only, no code)", cites:["qwen:eval","qwen:status"] },
    }
  },
];
