let audioCtx = null;
    let oscPrimary = null;
    let oscHarmonic = null;
    let gainNode = null;
    let isPlaying = false;
    let currentFreq = 432;
    let breathInterval = null;
    let isBreathing = false;

    function initAudio() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playBowlSound(hz) {
      initAudio();
      stopSound(0.3);

      setTimeout(() => {
        const now = audioCtx.currentTime;
        oscPrimary = audioCtx.createOscillator();
        oscHarmonic = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscPrimary.type = 'sine';
        oscPrimary.frequency.setValueAtTime(hz, now);

        oscHarmonic.type = 'sine';
        oscHarmonic.frequency.setValueAtTime(hz * 2.76, now);

        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.exponentialRampToValueAtTime(0.18, now + 1.2);
        gainNode.gain.exponentialRampToValueAtTime(0.06, now + 3.8);

        const subGain = audioCtx.createGain();
        subGain.gain.setValueAtTime(0.04, now);

        oscHarmonic.connect(subGain);
        subGain.connect(gainNode);
        oscPrimary.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscPrimary.start(now);
        oscHarmonic.start(now);
        isPlaying = true;
      }, 320);
    }

    function stopSound(fadeTime = 0.8) {
      if (gainNode && audioCtx && isPlaying) {
        try {
          const now = audioCtx.currentTime;
          gainNode.gain.setValueAtTime(gainNode.gain.value, now);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + fadeTime);
          setTimeout(() => {
            if (oscPrimary) { oscPrimary.stop(); oscPrimary.disconnect(); oscPrimary = null; }
            if (oscHarmonic) { oscHarmonic.stop(); oscHarmonic.disconnect(); oscHarmonic = null; }
            isPlaying = false;
          }, fadeTime * 1000 + 50);
        } catch(e) {}
      }
    }

    function selectFrequency(hz) {
      currentFreq = hz;
      document.querySelectorAll('.btn-sound-pill').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById('btn-' + hz);
      if (activeBtn) activeBtn.classList.add('active');

      playBowlSound(hz);
      document.getElementById('soundStatusNotice').innerText = `✨ Sintiendo la vibración en ${hz} Hz... Respira profundo.`;
    }

    function toggleBreathing() {
      const wrapper = document.getElementById('breatheWrapper');
      const text = document.getElementById('breatheText');

      if (!isBreathing) {
        isBreathing = true;
        wrapper.classList.add('breathe-active');
        text.innerText = "Inhala...";
        playBowlSound(currentFreq);

        let phase = 0;
        breathInterval = setInterval(() => {
          phase = (phase + 1) % 2;
          if (phase === 0) {
            text.innerText = "Inhala...";
            playBowlSound(currentFreq);
          } else {
            text.innerText = "Exhala...";
          }
        }, 4000);
      } else {
        isBreathing = false;
        wrapper.classList.remove('breathe-active');
        text.innerText = "Comenzar";
        clearInterval(breathInterval);
        stopSound(0.8);
      }
    }

    function reservarTipo(tipo) {
      document.getElementById('selectModalidad').value = tipo;
      document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    }


    function alEnviarFormulario(e) {
      const btn = document.getElementById('btnSubmitForm');
      const form = document.getElementById('formularioCariño');

      if (btn) {
        btn.innerHTML = "🕊️ Enviando con calma...";
        btn.disabled = true;
      }

      // Mostramos de inmediato el pop-up armonioso
      abrirPopupConfirmacion();

      // Dejamos que el navegador tramite el envio al iframe y reseteamos el formulario
      setTimeout(() => {
        if (form) form.reset();
        if (btn) {
          btn.innerHTML = "✨ Enviar mensaje con serenidad";
          btn.disabled = false;
        }
      }, 1500);
    }

    function abrirPopupConfirmacion() {
      const modal = document.getElementById('modalConfirmacion');
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    }

    function cerrarPopupConfirmacion() {
      const modal = document.getElementById('modalConfirmacion');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }

  
    // ARTÍCULOS DETALLADOS DEL BLOG
    const articulosBlog = {
      prenatal: {
        tag: "🌸 Maternidad Consciente · Vínculo Prenatal",
        titulo: "Musicoterapia Prenatal: El primer latido y la memoria sonora del vientre",
        contenido: `
          <p>Hacia la semana 16 de gestación, el sistema auditivo del feto comienza a estructurarse, y para la semana 24 el oído ya es plenamente funcional. Mucho antes de abrir los ojos a la luz del exterior, el bebé ya habita un universo puramente acústico: el latido de la placenta, la respiración materna y las frecuencias que atraviesan la pared abdominal.</p>
          <div class="quote-box" style="margin: 1.5rem 0;">
            "El primer hogar del ser humano no está hecho de ladrillos ni palabras, sino de ritmo: el compás incesante del corazón de la madre y la resonancia líquida de su voz."
          </div>
          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">1. El agua amniótica como conductor acústico</h4>
          <p>El sonido viaja casi cuatro veces más rápido a través del líquido que por el aire. El feto siente las ondas sonoras en toda la superficie de su cuerpo a través de la piel y los huesos. Cuando la madre se expone a tonos puros de cuencos de cuarzo o campanas armónicas en 432 Hz, las microvibraciones relajan el diafragma materno y proporcionan un masaje intrauterino reconfortante.</p>
          
          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">2. La voz materna: el primer apego seguro</h4>
          <p>Al cantar o tararear melodías suaves, las cuerdas vocales transmiten vibraciones directas a través de la columna vertebral y la pelvis hacia el útero. Este baño sonoro estimula la mielinización de las vías neuronales del feto y le enseña que el mundo exterior es un espacio seguro.</p>

          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">3. Alivio del cortisol y preparación para el parto</h4>
          <p>La musicoterapia prenatal reduce los niveles de estrés materno que de otro modo atravesarían la placenta. Además, las técnicas de vocalización aprendidas en sesión actúan como una herramienta analgésica natural durante las contracciones de parto.</p>
        `
      },
      caballos: {
        tag: "🐴 Terapias Integrativas · Bienestar Animal",
        titulo: "La vibración acústica en los caballos: Sensibilidad, calma y vínculo",
        contenido: `
          <p>El caballo es un animal de presa por naturaleza evolutiva. Esto significa que su sistema sensorial está afinado para captar la más mínima alteración en el entorno: percibe frecuencias infrasónicas a través de los cascos, capta vibraciones sutiles a través de sus vibrisas faciales y cuenta con una audición orientable de 180 grados.</p>
          <div class="quote-box" style="margin: 1.5rem 0;">
            "Un caballo no escucha la música con el intelecto; la recibe como un estado electromagnético que resuena directamente en su sistema nervioso autónomo."
          </div>
          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">1. El impacto en el estrés y la recuperación muscular</h4>
          <p>En caballos que han sufrido cólicos, sobreentrenamiento o estrés por transporte, la aplicación de cuencos tibetanos de aleación noble colocados sobre mantillas acolchadas a lo largo de la columna vertebral y la grupa genera una micro-vibración celular. La frecuencia oscilatoria ayuda a desinflamar fascias contraídas y reduce drásticamente los niveles de cortisol salivar en menos de 20 minutos.</p>
          
          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">2. La respuesta de relajación visible (Bostezo y Masticación)</h4>
          <p>Durante una sesión sonoterapia en el box o paddock, los primeros signos de integración parasimpática son inmediatos: el animal baja la cerviz, entrecierra los párpados, relaja el labio inferior y comienza a lamer y masticar. Estos son los indicadores etológicos inequívocos de que el sistema nervioso ha pasado del estado de alerta (*fight or flight*) al modo de regeneración y digestión.</p>

          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">3. Coherencia cardíaca entre el jinete y el caballo</h4>
          <p>El sonido de monocordios afinados en frecuencias de la serie armónica natural (432 Hz) crea un campo envolvente que no solo aquieta al caballo, sino también al cuidador o jinete. Cuando el pulso cardíaco del ser humano se apacigua, el caballo lo sincroniza al instante, disolviendo miedos y restableciendo un lazo de confianza mutua inquebrantable.</p>
        `
      },
      personas: {
        tag: "✨ Salud Integral · Neurociencia y Emoción",
        titulo: "La Musicoterapia en las Personas: Restaurando la sinfonía del sistema nervioso",
        contenido: `
          <p>En la vida contemporánea, la mayor parte de las personas vivimos ancladas en un estado de vigilia tensa (ondas Beta cerebrales). El ruido mental constante, las urgencias digitales y las responsabilidades acumulan una tensión residual que se enquista en el pecho, el plexo solar y el cuello.</p>
          <div class="quote-box" style="margin: 1.5rem 0;">
            "La música terapéutica es el único estímulo sensorial capaz de activar simultáneamente los dos hemisferios cerebrales, la memoria afectiva y el sistema parasimpático sin requerir esfuerzo cognitivo."
          </div>
          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">1. Ralentización de ondas cerebrales (De Beta a Alfa y Theta)</h4>
          <p>Los tonos puros emitidos por cuencos de cuarzo y campanas armónicas producen el fenómeno de <em>arrastre auditivo (entrainment)</em>. Las neuronas sincronizan sus disparos con el compás de la onda sonora, guiando a la mente hacia estados Alfa (relajación atenta) y Theta (reparación profunda, creatividad y descanso equivalente a varias horas de sueño reparador).</p>

          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">2. El desahogo emocional que las palabras no alcanzan</h4>
          <p>Existen duelos, fracturas vitales y cansancios del alma para los que las palabras resultan insuficientes o dolorosas. En una sesión de musicoterapia, la persona no tiene que justificarse ni elaborar un relato; la vibración abre suavemente las corazas protectoras, permitiendo que el suspiro, la lágrima o la ligereza surjan de manera espontánea en un entorno de seguridad absoluta.</p>

          <h4 style="font-size: 1.35rem; color: var(--c-text-main); margin: 1.5rem 0 0.5rem; font-family: Georgia, serif;">3. Memoria viva y lucidez en adultos mayores</h4>
          <p>La memoria musical es una de las últimas en degradarse en procesos neurodegenerativos. Cuando entonamos canciones de la juventud o acompañamos a personas mayores con el sonido pausado de diapasones, asistimos al milagro de la conexión: miradas que vuelven a brillar, tarareos espontáneos y una sensación de dignidad y ternura que reconecta a la persona con su esencia original.</p>
        `
      }
    };

    function abrirArticuloBlog(slug) {
      const art = articulosBlog[slug];
      if (!art) return;
      document.getElementById('blogTag').innerText = art.tag;
      document.getElementById('blogTitulo').innerText = art.titulo;
      document.getElementById('blogContenido').innerHTML = art.contenido;

      // Actualizar enlaces dinamicos de compartir
      let targetUrl = 'https://www.carlosmusicoterapia.online/musicoterapia-personas.html';
      if (slug === 'caballos') targetUrl = 'https://www.carlosmusicoterapia.online/musicoterapia-caballos.html';
      if (slug === 'prenatal') targetUrl = 'https://www.carlosmusicoterapia.online/musicoterapia-prenatal.html';
      const targetTitle = encodeURIComponent(art.titulo);
      const encodedUrl = encodeURIComponent(targetUrl);

      const fb = document.getElementById('modalShareFb');
      const wa = document.getElementById('modalShareWa');
      const x = document.getElementById('modalShareX');
      const ig = document.getElementById('modalShareIg');

      if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      if (wa) wa.href = `https://api.whatsapp.com/send?text=${targetTitle}%20${encodedUrl}`;
      if (x) x.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${targetTitle}`;
      if (ig) ig.onclick = () => compartirInstagram(targetUrl);

      document.getElementById('modalBlog').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    function compartirInstagram(url) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          alert("✨ ¡Enlace copiado al portapapeles! Ya puedes compartirlo en tu historia o mensaje de Instagram.");
        }).catch(() => {
          prompt("Copia este enlace para compartir en Instagram:", url);
        });
      } else {
        prompt("Copia este enlace para compartir en Instagram:", url);
      }
    }

    function cerrarArticuloBlog() {
      document.getElementById('modalBlog').style.display = 'none';
      document.body.style.overflow = 'auto';
    }

  


      function toggleMenuMovil() {
      const nav = document.getElementById('navLinks');
      const iconH = document.getElementById('iconHamburger');
      const iconC = document.getElementById('iconClose');
      
      if (nav && nav.classList.contains('menu-open')) {
        cerrarMenuMovil();
      } else if (nav) {
        nav.classList.add('menu-open');
        if (iconH) iconH.style.display = 'none';
        if (iconC) iconC.style.display = 'block';
      }
    }

    function cerrarMenuMovil() {
      const nav = document.getElementById('navLinks');
      const iconH = document.getElementById('iconHamburger');
      const iconC = document.getElementById('iconClose');
      if (nav) nav.classList.remove('menu-open');
      if (iconH) iconH.style.display = 'block';
      if (iconC) iconC.style.display = 'none';
    }