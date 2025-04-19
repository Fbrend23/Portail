(async () => {
    await loadStarsPreset(tsParticles);
  
    await tsParticles.load({
      id: "tsparticles",
      options: {
        preset: "stars",
        background: {
          color: {
            value: "transparent"
          }
        }
      },
    });
  })();