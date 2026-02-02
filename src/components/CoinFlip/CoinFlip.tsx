import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useBetStore } from '../../store/betStore';

// Coin flip animation data (gold coin)
const coinFlipAnimation = {
  v: '5.7.4',
  fr: 60,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: 'Coin Flip',
  ddd: 1,
  assets: [],
  layers: [
    {
      ddd: 1,
      ind: 1,
      ty: 4,
      nm: 'Coin Front',
      sr: 1,
      ks: {
        o: {
          a: 0,
          k: 100
        },
        rx: {
          a: 1,
          k: [
            {
              i: {
                x: [0.4],
                y: [1]
              },
              o: {
                x: [0.6],
                y: [0]
              },
              t: 0,
              s: [0]
            },
            {
              i: {
                x: [0.4],
                y: [1]
              },
              o: {
                x: [0.6],
                y: [0]
              },
              t: 15,
              s: [-15]
            },
            {
              i: {
                x: [0.4],
                y: [1]
              },
              o: {
                x: [0.6],
                y: [0]
              },
              t: 30,
              s: [0]
            },
            {
              i: {
                x: [0.4],
                y: [1]
              },
              o: {
                x: [0.6],
                y: [0]
              },
              t: 45,
              s: [15]
            },
            {
              t: 60,
              s: [0]
            }]

        },
        ry: {
          a: 1,
          k: [
            {
              i: {
                x: [0.2],
                y: [1]
              },
              o: {
                x: [0.8],
                y: [0]
              },
              t: 0,
              s: [0]
            },
            {
              t: 60,
              s: [1080]
            }]

        },
        rz: {
          a: 0,
          k: 0
        },
        or: {
          a: 0,
          k: [0, 0, 0]
        },
        p: {
          a: 1,
          k: [
            {
              i: {
                x: 0.4,
                y: 1
              },
              o: {
                x: 0.6,
                y: 0
              },
              t: 0,
              s: [100, 100, 0],
              to: [0, -25, 0],
              ti: [0, 0, 0]
            },
            {
              i: {
                x: 0.4,
                y: 1
              },
              o: {
                x: 0.6,
                y: 0
              },
              t: 30,
              s: [100, 50, 0],
              to: [0, 0, 0],
              ti: [0, -25, 0]
            },
            {
              t: 60,
              s: [100, 100, 0]
            }]

        },
        a: {
          a: 0,
          k: [100, 100, 0]
        },
        s: {
          a: 0,
          k: [100, 100, 100]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              d: 1,
              ty: 'el',
              s: {
                a: 0,
                k: [160, 160]
              },
              p: {
                a: 0,
                k: [0, 0]
              },
              nm: 'Coin Base'
            },
            {
              ty: 'gf',
              o: {
                a: 0,
                k: 100
              },
              r: 1,
              bm: 0,
              g: {
                p: 3,
                k: {
                  a: 0,
                  k: [
                    0, 1, 0.843, 0.4, 0.5, 0.961, 0.647, 0.188, 1, 0.922, 0.451,
                    0]

                }
              },
              s: {
                a: 0,
                k: [-60, -60]
              },
              e: {
                a: 0,
                k: [60, 60]
              },
              t: 1,
              nm: 'Gold Gradient'
            },
            {
              ty: 'st',
              c: {
                a: 0,
                k: [1, 0.898, 0.6, 1]
              },
              o: {
                a: 0,
                k: 100
              },
              w: {
                a: 0,
                k: 8
              },
              lc: 1,
              lj: 1,
              ml: 4,
              bm: 0,
              nm: 'Border'
            },
            {
              ty: 'tr',
              p: {
                a: 0,
                k: [100, 100]
              },
              a: {
                a: 0,
                k: [0, 0]
              },
              s: {
                a: 0,
                k: [100, 100]
              },
              r: {
                a: 0,
                k: 0
              },
              o: {
                a: 0,
                k: 100
              }
            }],

          nm: 'Coin Shape'
        },
        {
          ty: 'gr',
          it: [
            {
              d: 1,
              ty: 'el',
              s: {
                a: 0,
                k: [120, 120]
              },
              p: {
                a: 0,
                k: [0, 0]
              },
              nm: 'Inner Ring'
            },
            {
              ty: 'st',
              c: {
                a: 0,
                k: [1, 0.95, 0.8, 0.4]
              },
              o: {
                a: 0,
                k: 100
              },
              w: {
                a: 0,
                k: 2
              },
              lc: 1,
              lj: 1,
              ml: 4,
              d: [
                {
                  n: 'd',
                  nm: 'dash',
                  v: {
                    a: 0,
                    k: 8
                  }
                },
                {
                  n: 'g',
                  nm: 'gap',
                  v: {
                    a: 0,
                    k: 4
                  }
                }],

              bm: 0,
              nm: 'Dashed Border'
            },
            {
              ty: 'tr',
              p: {
                a: 0,
                k: [100, 100]
              },
              a: {
                a: 0,
                k: [0, 0]
              },
              s: {
                a: 0,
                k: [100, 100]
              },
              r: {
                a: 0,
                k: 0
              },
              o: {
                a: 0,
                k: 100
              }
            }],

          nm: 'Inner Detail'
        }],

      ip: 0,
      op: 60,
      st: 0,
      bm: 0
    }],

  markers: []
};
interface CoinFlipProps {
  isFlipping: boolean;
  result: 'win' | 'loss' | null;
}
export const CoinFlip: React.FC<CoinFlipProps> = ({ isFlipping, result }) => {
  const { selectedCurrency } = useBetStore();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'BTC':
        return '₿';
      case 'ETH':
        return 'Ξ';
      case 'SOL':
        return '◎';
      default:
        return '$';
    }
  };
  const symbol = getCurrencySymbol(selectedCurrency);
  useEffect(() => {
    if (lottieRef.current) {
      if (isFlipping) {
        lottieRef.current.setSpeed(1.5);
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isFlipping]);
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8">
      {/* Glow Effect Background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[120px]"
        animate={{
          backgroundColor:
            result === 'win' ?
              'rgba(16, 185, 129, 0.25)' :
              result === 'loss' ?
                'rgba(244, 63, 94, 0.25)' :
                'rgba(245, 158, 11, 0.15)',
          scale: isFlipping ? [1, 1.2, 1] : 1
        }}
        transition={{
          backgroundColor: {
            duration: 0.5
          },
          scale: {
            duration: 0.5,
            repeat: isFlipping ? Infinity : 0
          }
        }} />


      {/* Coin Container */}
      <div className="relative w-44 h-44 md:w-60 md:h-60">
        {/* Lottie Animation (shown when flipping) */}
        <AnimatePresence>
          {isFlipping &&
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.8
              }}
              className="absolute inset-0">

              <Lottie
                lottieRef={lottieRef}
                animationData={coinFlipAnimation}
                loop={true}
                autoplay={true}
                style={{
                  width: '100%',
                  height: '100%'
                }} />

            </motion.div>
          }
        </AnimatePresence>

        {/* Static Coin (shown when not flipping) */}
        <AnimatePresence>
          {!isFlipping &&
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotateY: 180
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: [0, -8, 0]
              }}
              exit={{
                opacity: 0,
                scale: 0.8
              }}
              transition={{
                opacity: {
                  duration: 0.3
                },
                scale: {
                  duration: 0.3
                },
                rotateY: {
                  duration: 0.5,
                  ease: 'easeOut'
                },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="absolute inset-0 flex items-center justify-center">

              <div
                className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center border-[6px] shadow-2xl transition-all duration-500 ${result === 'win' ? 'border-emerald-400 bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 shadow-emerald-500/30' : result === 'loss' ? 'border-rose-400 bg-gradient-to-br from-rose-400 via-rose-600 to-rose-800 shadow-rose-500/30' : 'border-amber-300 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-amber-500/30'}`}>

                {/* Inner ring */}
                <div
                  className={`absolute inset-3 rounded-full border-2 border-dashed transition-colors duration-500 ${result === 'win' ? 'border-emerald-200/40' : result === 'loss' ? 'border-rose-200/40' : 'border-amber-200/40'}`} />


                {/* Currency Symbol */}
                <span
                  className={`text-6xl md:text-8xl font-black drop-shadow-lg transition-colors duration-500 ${result === 'win' ? 'text-emerald-100' : result === 'loss' ? 'text-rose-100' : 'text-amber-100'}`}>

                  {symbol}
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Dynamic Shadow */}
      <motion.div
        className="absolute bottom-2 w-28 h-3 bg-black/50 blur-xl rounded-full"
        animate={{
          scale: isFlipping ? [1, 0.6, 1] : [1, 1.15, 1],
          opacity: isFlipping ? [0.5, 0.2, 0.5] : 0.4
        }}
        transition={{
          duration: isFlipping ? 0.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />


      {/* Result Badge */}
      <AnimatePresence>
        {!isFlipping && result &&
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              y: 30
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              y: 10
            }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 300
            }}
            className={`absolute -bottom-20 px-8 py-3 rounded-2xl font-black text-2xl tracking-widest shadow-xl backdrop-blur-md border-2 ${result === 'win' ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-400 shadow-emerald-500/25' : 'bg-rose-500/20 border-rose-400/60 text-rose-400 shadow-rose-500/25'}`}>

            {result === 'win' ? '🎉 WIN!' : 'LOSS'}
          </motion.div>
        }
      </AnimatePresence>

      {/* Win Particles */}
      <AnimatePresence>
        {!isFlipping && result === 'win' &&
          <>
            {[...Array(8)].map((_, i) =>
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                  x: Math.cos(i * 45 * Math.PI / 180) * 120,
                  y: Math.sin(i * 45 * Math.PI / 180) * 120 - 50
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-amber-400"
                style={{
                  boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                }} />

            )}
          </>
        }
      </AnimatePresence>
    </div>);

};