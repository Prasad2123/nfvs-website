import React from 'react';
import { X, Cpu, Wifi, Bot, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface NFLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDomain: 'AI' | 'IoT' | 'Robotics' | 'Electronics';
  onSelectDomain: (domain: 'AI' | 'IoT' | 'Robotics' | 'Electronics') => void;
  onApply: (domain: string) => void;
  isDark?: boolean;
}

export const NFLabModal: React.FC<NFLabModalProps> = ({
  isOpen,
  onClose,
  activeDomain,
  onSelectDomain,
  onApply,
  isDark = true,
}) => {
  if (!isOpen) return null;

  const labDetails = {
    AI: {
      title: 'Artificial Intelligence & Machine Learning Lab',
      badge: 'AI & Data Science',
      icon: Cpu,
      color: 'from-blue-600 to-indigo-700',
      description:
        'High-performance GPU computing clusters, model training workstations, and cloud sandbox environments designed for accelerating deep-tech AI algorithms, computer vision, NLP, and predictive analytics models.',
      equipment: [
        'Dedicated NVIDIA RTX & A100 GPU compute instances',
        'Pre-configured PyTorch, TensorFlow, TensorRT runtime stacks',
        'Edge AI accelerators (NVIDIA Jetson Orin, Google Coral TPUs)',
        'Enterprise dataset labeling, synthetic data generation, and vector DB setups',
        'Model inference optimization and edge deployment pipelines',
      ],
      deliverables: 'From academic algorithmic papers to real-time scalable AI products and enterprise APIs.',
    },
    IoT: {
      title: 'Internet of Things & Connected Systems Lab',
      badge: 'IoT & Smart Sensors',
      icon: Wifi,
      color: 'from-cyan-600 to-blue-700',
      description:
        'Comprehensive testing rigs for wireless protocols, smart sensor arrays, firmware development tools, and gateway testing setups for industrial, agricultural, and smart healthcare IoT products.',
      equipment: [
        'Multi-protocol test benches: LoRaWAN, BLE 5.3, Zigbee, WiFi 6, NB-IoT',
        'High-precision digital oscilloscopes & logic analyzers',
        'Ultra-low power testing and energy harvesting simulator kits',
        'Industrial sensor interfacing rigs (pressure, thermal, optical, chemical)',
        'Secure cloud MQTT broker and remote OTA firmware testbeds',
      ],
      deliverables: 'Fully tested hardware nodes ready for field pilots and mass PCB fabrication.',
    },
    Robotics: {
      title: 'Robotics & Mechatronics Prototyping Lab',
      badge: 'Robotics & Automation',
      icon: Bot,
      color: 'from-amber-600 to-orange-700',
      description:
        'Rapid physical prototyping suite with multi-axis CNC machines, 3D printing farm, robotic arm test cells, actuator calibration rigs, and ROS2 simulation environments.',
      equipment: [
        '6-DOF industrial robotic arms and collaborative robot (Cobot) cells',
        'High-precision SLA & FDM 3D printing farm for custom end-effectors',
        'Motor drive test benches (BLDC, Stepper, Servo drivers with encoder feedback)',
        'LiDAR, ultrasonic, and stereo-depth vision perception rigs',
        'ROS2 (Robot Operating System) simulation & kinematics modeling rigs',
      ],
      deliverables: 'Functional electromechanical MVPs tested for industrial and commercial reliability.',
    },
    Electronics: {
      title: 'Electronics & Embedded Hardware Systems Lab',
      badge: 'Electronics & PCB Design',
      icon: Zap,
      color: 'from-emerald-600 to-teal-700',
      description:
        'Clean-room class electronics development station for schematic design, multi-layer PCB rapid prototyping, SMD pick-and-place soldering, and electromagnetic compliance testing.',
      equipment: [
        'SMD rework stations, reflow ovens, and thermal imaging cameras',
        'Automated optical inspection (AOI) & digital microscopes',
        'Multi-layer PCB prototyping milling machines for same-day board fab',
        'Spectrum analyzers and signal generators up to 6 GHz',
        'Standard compliance and thermal shock reliability chambers',
      ],
      deliverables: 'Production-ready Gerber files, BOM optimization, and CE/FCC compliance readiness.',
    },
  };

  const current = labDetails[activeDomain];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors duration-300 ${
        isDark
          ? 'bg-[#091528] border border-sky-500/40 text-white'
          : 'bg-white border border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${current.color} p-4 sm:p-6 relative transition-colors duration-300 text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Icon className="w-3.5 h-3.5" />
            SPECIALIZED LAB INFRASTRUCTURE
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">{current.title}</h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
            NF Venture Studio provides state-of-the-art access to transform laboratory prototypes into industrial-grade ventures.
          </p>
        </div>

        {/* Domain Tabs - Horizontal Scroll on mobile */}
        <div className={`p-2 flex border-b gap-1.5 overflow-x-auto no-scrollbar transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          {(['AI', 'IoT', 'Robotics', 'Electronics'] as const).map((dom) => (
            <button
              key={dom}
              onClick={() => onSelectDomain(dom)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeDomain === dom
                  ? 'bg-sky-500 text-white shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                dom === 'AI' ? 'bg-blue-400' :
                dom === 'IoT' ? 'bg-cyan-400' :
                dom === 'Robotics' ? 'bg-amber-400' : 'bg-emerald-400'
              }`} />
              {dom} Lab
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-5">
          <div>
            <h4 className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-sky-400' : 'text-sky-700'
            }`}>
              Lab Overview
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {current.description}
            </p>
          </div>

          <div>
            <h4 className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-sky-400' : 'text-sky-700'
            }`}>
              Key Facilities & Equipment Available
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {current.equipment.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border text-xs transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-3 sm:p-3.5 rounded-xl border text-xs ${
            isDark
              ? 'bg-sky-950/60 border-sky-500/30 text-sky-200'
              : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}>
            <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Target Output: </span>
            {current.deliverables}
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3.5 sm:p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Helpline: <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>8379879846</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onApply(activeDomain);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Apply for {activeDomain} Lab Access
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
