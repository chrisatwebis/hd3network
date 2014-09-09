<?php

/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 * 
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

/**
 * Implements hook_preprocess_block().
 *
 *
 *
 * Override or insert variables into the block templates.
 */

function hd3_network_preprocess_block(&$variables) {
  // For bean blocks.
  if ($variables['block']->module == 'bean') {
		
    // Get the bean elements.
    $beans = $variables['elements']['bean'];
    // There is only 1 bean per block.

    $children = element_children($beans);

    $bean = $beans[reset($children)];

    // Add bean type classes to the parent block.
    $prefix = 'block-bean-' . $bean['#bundle'];
    $variables['attributes_array']['class'][] = drupal_html_class($prefix);

    //Handle 'image block' bean
    switch ($bean['#bundle']) {
    	case 'image_block':
    		if(!empty($bean['field_block_style']['#items'][0]['value'])){
	    		$variables['attributes_array']['class'][] = drupal_html_class($bean['field_block_style']['#items'][0]['value']);
    		}
    		break;
/*    	case 'blue_block':
    		if(!empty($bean['field_blue_block_colour']['#items'][0]['value'])){
	    		$variables['classes_array'][] = drupal_html_class($bean['field_blue_block_colour']['#items'][0]['value']);
    		}
    		break;
    	case 'youtube_video_block':
    		if(!empty($bean['field_blue_block_colour']['#items'][0]['value'])){
	    		$variables['classes_array'][] = drupal_html_class($bean['field_blue_block_colour']['#items'][0]['value']);
    		}
    		break;*/
    	default:
    		# code...
    		break;
    }
    
    // Add template suggestions for bean types.
    $variables['theme_hook_suggestions'][] = 'block__bean__' . $bean['#bundle'];
  }
}
