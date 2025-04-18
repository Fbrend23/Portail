(async () => {
    await loadStarsPreset(tsParticles);
  
    await tsParticles.load({
      id: "tsparticles",
      options: {
        preset: "stars",
      },
    });
  })();