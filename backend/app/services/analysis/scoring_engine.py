"""
Scoring Engine - Original Algorithm for Hackathon
Custom scoring system combining multimodal AI analysis
Team: Veeresh, Shivraj, Shivakumar, Tharungowda
"""

from typing import Dict, List


class ScoringEngine:
    """
    Original scoring algorithm combining:
    - Audio features (20%)
    - Visual engagement (20%)
    - Technical content (30%)
    - Clarity (20%)
    - Interaction (10%)
    """
    
    WEIGHTS = {
        "engagement": 0.20,
        "communication": 0.20,
        "technical_depth": 0.30,
        "clarity": 0.20,
        "interaction": 0.10
    }
    
    def calculate_scores(self, analysis_results: Dict) -> Dict:
        """Calculate all scores based on multimodal analysis"""
        
        audio_features = analysis_results.get("audio_features", {})
        visual_features = analysis_results.get("visual_features", {})
        nlp_analysis = analysis_results.get("nlp_analysis", {})
        
        # Calculate individual scores
        engagement = self._calculate_engagement(visual_features, audio_features)
        communication = self._calculate_communication(audio_features, nlp_analysis)
        technical = self._calculate_technical(nlp_analysis)
        clarity = self._calculate_clarity(audio_features, nlp_analysis)
        interaction = self._calculate_interaction(visual_features, nlp_analysis)
        
        # Calculate weighted overall score
        overall = (
            engagement * self.WEIGHTS["engagement"] +
            communication * self.WEIGHTS["communication"] +
            technical * self.WEIGHTS["technical_depth"] +
            clarity * self.WEIGHTS["clarity"] +
            interaction * self.WEIGHTS["interaction"]
        )
        
        return {
            "engagement": round(engagement, 2),
            "communication": round(communication, 2),
            "technical_depth": round(technical, 2),
            "clarity": round(clarity, 2),
            "interaction": round(interaction, 2),
            "overall": round(overall, 2)
        }
    
    def _calculate_engagement(self, visual: Dict, audio: Dict) -> float:
        """
        Engagement Score (0-100)
        Factors: gestures, face presence, energy
        """
        score = 70.0  # Base score
        
        # Visual engagement indicators
        if visual.get("gesture_count", 0) > 10:
            score += 10
        if visual.get("face_confidence", 0) > 0.8:
            score += 10
        
        # Audio energy
        energy = audio.get("energy_mean", 0.5)
        score += (energy * 10)
        
        return min(100, max(0, score))
    
    def _calculate_communication(self, audio: Dict, nlp: Dict) -> float:
        """
        Communication Score (0-100)
        Factors: speech rate, clarity from NLP
        """
        score = 70.0
        
        # Speech rate (optimal: 130-170 wpm)
        wpm = audio.get("speech_rate", 150)
        if 130 <= wpm <= 170:
            score += 15
        elif 120 <= wpm <= 180:
            score += 10
        
        # Clarity from NLP
        if nlp.get("clarity_score"):
            score += (nlp["clarity_score"] * 15)
        
        return min(100, max(0, score))
    
    def _calculate_technical(self, nlp: Dict) -> float:
        """
        Technical Depth Score (0-100)
        Factors: technical terms, depth from LLaMA
        """
        score = 65.0
        
        # Technical terms usage
        if nlp.get("technical_term_count", 0) > 5:
            score += 20
        
        # Content depth from LLaMA
        if nlp.get("technical_depth_score"):
            score += (nlp["technical_depth_score"] * 15)
        
        return min(100, max(0, score))
    
    def _calculate_clarity(self, audio: Dict, nlp: Dict) -> float:
        """
        Clarity Score (0-100)
        Factors: pause ratio, sentence structure
        """
        score = 70.0
        
        # Pause ratio (optimal: 0.10-0.20)
        pause_ratio = audio.get("pause_ratio", 0.15)
        if 0.10 <= pause_ratio <= 0.20:
            score += 15
        
        # Sentence structure from NLP
        if nlp.get("structure_score"):
            score += (nlp["structure_score"] * 15)
        
        return min(100, max(0, score))
    
    def _calculate_interaction(self, visual: Dict, nlp: Dict) -> float:
        """
        Interaction Score (0-100)
        Factors: questions, eye contact
        """
        score = 60.0
        
        # Question patterns
        if nlp.get("question_count", 0) > 3:
            score += 20
        
        # Eye contact
        if visual.get("eye_contact_ratio", 0) > 0.6:
            score += 20
        
        return min(100, max(0, score))
    
    def generate_insights(self, analysis_results: Dict, scores: Dict) -> Dict:
        """Generate AI insights - Original algorithm"""
        
        strengths = []
        improvements = []
        recommendations = []
        
        # Analyze each metric
        for metric, score in scores.items():
            if metric == "overall":
                continue
            
            if score >= 85:
                strengths.append(self._get_strength_message(metric, score))
            elif score < 70:
                improvements.append(self._get_improvement_message(metric, score))
                recommendations.extend(self._get_recommendations(metric))
        
        # Overall recommendations
        if scores["overall"] >= 90:
            recommendations.append("Excellent performance! Consider mentoring other instructors.")
        
        return {
            "strengths": strengths[:5],
            "improvements": improvements[:5],
            "recommendations": recommendations[:6],
            "key_highlights": self._generate_key_highlights(analysis_results, scores)
        }
    
    def _get_strength_message(self, metric: str, score: float) -> str:
        messages = {
            "engagement": f"Outstanding student engagement (Score: {score}/100)",
            "communication": f"Excellent communication clarity (Score: {score}/100)",
            "technical_depth": f"Strong technical knowledge (Score: {score}/100)",
            "clarity": f"Very clear explanations (Score: {score}/100)",
            "interaction": f"Effective student interaction (Score: {score}/100)"
        }
        return messages.get(metric, f"Strong {metric}")
    
    def _get_improvement_message(self, metric: str, score: float) -> str:
        messages = {
            "engagement": f"Student engagement needs improvement (Score: {score}/100)",
            "communication": f"Communication could be enhanced (Score: {score}/100)",
            "technical_depth": f"Technical depth requires strengthening (Score: {score}/100)",
            "clarity": f"Explanations need better structure (Score: {score}/100)",
            "interaction": f"Increase student interaction (Score: {score}/100)"
        }
        return messages.get(metric, f"{metric} needs attention")
    
    def _get_recommendations(self, metric: str) -> List[str]:
        recommendations = {
            "engagement": ["Use more real-world examples", "Add interactive elements"],
            "communication": ["Practice pronunciation", "Work on pacing"],
            "technical_depth": ["Deepen subject knowledge", "Add practical examples"],
            "clarity": ["Create structured outlines", "Break down complex topics"],
            "interaction": ["Schedule Q&A sessions", "Encourage questions"]
        }
        return recommendations.get(metric, [])
    
    def _generate_key_highlights(self, results: Dict, scores: Dict) -> str:
        overall = scores["overall"]
        
        if overall >= 90:
            return "Exceptional teaching performance across all metrics"
        elif overall >= 80:
            return "Strong teaching performance with minor areas for growth"
        elif overall >= 70:
            return "Good teaching foundation with opportunities for improvement"
        else:
            return "Developing teaching skills with focused improvement needed"